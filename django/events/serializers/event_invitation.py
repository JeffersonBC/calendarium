from django.contrib.auth import get_user_model
from django.utils.timezone import now

from rest_framework import serializers

from ..models import EventInvitation


class EventInvitationSerializer(serializers.ModelSerializer):
    rejected = serializers.BooleanField(default=False)

    class Meta:
        model = EventInvitation
        read_only_fields = ['id']

        fields = (
            'id',
            'rejected',
        )

    def create(self, validated_data):
        invitation = EventInvitation(
            rejected=False
        )
        invitation.set_user(validated_data['user'])
        invitation.set_event(validated_data['event'])

        invitation.save()

        return invitation

    def update(self, instance, validated_data):
        instance.rejected = validated_data.get('rejected', instance.rejected)

        instance.save()
        return instance
