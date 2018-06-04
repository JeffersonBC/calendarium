from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from events.models import EventInvitation

import json


class InvitationCountConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.group_name = 'inv_count_' + self.user_id
        self.count = await database_sync_to_async(self.get_invitation_count)(self.user_id)

        # Connects to the group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        newCount = text_data_json['msg']['count']
        self.count += newCount

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'count_update',
                'msg': {
                    'count': self.count
                }
            }
        )

    async def count_update(self, event):
        message = event['msg']

        await self.send(text_data=json.dumps({
            'msg': message
        }))

    def get_invitation_count(self, user_id):
        return EventInvitation.objects \
            .filter(user_id=self.user_id) \
            .filter(rejected=False) \
            .count()