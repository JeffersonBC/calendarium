from django.contrib.auth import get_user_model
from django.utils.timezone import now

from rest_framework import serializers

from ..models import Event, EventSubscription


class EventSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=254)
    description = serializers.CharField(allow_blank=True)
    start_datetime = serializers.DateTimeField()
    end_datetime = serializers.DateTimeField()

    class Meta:
        model = Event
        read_only_fields = ['id']

        fields = (
            'id',
            'name',
            'description',
            'start_datetime',
            'end_datetime',
        )

    def validate(self, data):
        # Checa se data/hora de início é menor que de fim
        if data['start_datetime'] > data['end_datetime']:
            raise serializers.ValidationError(
                "Fim do evento deve acontecer após o início")

        # Checa conflitos de horário
        instance = None
        if 'instance' in self.context:
            instance = self.context['instance']

        events = EventSubscription.objects \
            .filter(user=self.context['user']) \
            .exclude(event__start_datetime__gte=data['end_datetime']) \
            .exclude(event__end_datetime__lte=data['start_datetime']) \
            .exclude(event=instance) \
            .order_by('event__start_datetime')

        count = events.count()
        if count > 0:
            msg = 'O horário selecionado está conflitando com os seguintes ' \
                'eventos: '

            for i, e in enumerate(events):
                i += 1
                msg += e.event.name
                if i < count:
                    msg += ', '

            raise serializers.ValidationError(msg)

        # Se nenhum erro foi encontrado, retorna os dados
        return data

    def create(self, validated_data):
        event = Event(
            name=validated_data.get('name'),
            description=validated_data.get('description'),
            start_datetime=validated_data.get('start_datetime'),
            end_datetime=validated_data.get('end_datetime')
        )
        event.set_creator(validated_data['creator'])

        event.save()

        return event

    def update(self, instance, validated_data):
        instance.name = validated_data.get(
            'name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.start_datetime = validated_data.get(
            'start_datetime', instance.start_datetime)
        instance.end_datetime = validated_data.get(
            'end_datetime', instance.end_datetime)

        instance.save()
        return instance
