from django.contrib.auth import get_user_model
from django.utils.timezone import now

from rest_framework import serializers

from ..models import Event


class EventSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=254)
    description = serializers.CharField(allow_blank=True)
    creator = serializers.IntegerField()
    start_datetime = serializers.DateTimeField(default=now)
    end_datetime = serializers.DateTimeField(default=now)

    class Meta:
        model = Event
        read_only_fields = ['id']

        fields = (
            'id',
            'name',
            'description',
            'creator',
            'start_datetime',
            'end_datetime',
        )

    def validate(self, data):
        if data['start_datetime'] > data['end_datetime']:
            raise serializers.ValidationError(
                "Fim do evento deve acontecer após o início")

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
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.start_datetime = validated_data.get(
            'start_datetime', instance.start_datetime)
        instance.end_datetime = validated_data.get(
            'end_datetime', instance.end_datetime)

        instance.save()
        return instance
