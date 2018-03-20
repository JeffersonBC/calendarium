from django.conf.urls import url

from ..views.api.event import (
    event_add,
    event_subscriptions_list,
)
from ..views.api.invite import (
    event_invite_details,
    event_invite_add,
    event_invite_list,
    event_invite_accept,
    event_invite_reject,
    event_invite_cancel,
)

urlpatterns = [
    url(
        r'^add/$',
        event_add,
        name='api_event_add'
    ),
    url(
        r'^get_by_date/$',
        event_subscriptions_list,
        name='api_event_get_by_date'
    ),

    url(
        r'^invite/(?P<id>[0-9]+)/$',
        event_invite_details,
        name='api_event_invite_details'
    ),
    url(
        r'^invite/(?P<id>[0-9]+)/add/$',
        event_invite_add,
        name='api_event_invite_add'
    ),

    url(
        r'^invitations/$',
        event_invite_list,
        name='api_event_invite_list'
    ),
    url(
        r'^invitations/accept/(?P<invitation_id>[0-9]+)/$',
        event_invite_accept,
        name='api_event_invite_accept'
    ),
    url(
        r'^invitations/reject/(?P<invitation_id>[0-9]+)/$',
        event_invite_reject,
        name='api_event_invite_reject'
    ),
    url(
        r'^invitations/cancel/(?P<subscription_id>[0-9]+)/$',
        event_invite_cancel,
        name='api_event_invite_cancel'
    ),
]
