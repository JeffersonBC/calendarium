from django.conf.urls import url

from events.consumers.invite import InvitationCountConsumer

websocket_urlpatterns = [
    url(r'^ws/invitations/count/(?P<user_id>[0-9]+)/$', InvitationCountConsumer),
]
