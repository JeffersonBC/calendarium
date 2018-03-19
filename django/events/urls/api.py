from django.conf.urls import url

from ..views.api import (
    event_add,
    event_get_subscriptions,
    event_invite_details,
    event_invite_add
)

urlpatterns = [
    url(
        r'^add/$',
        event_add,
        name='api_event_add'
    ),
    url(
        r'^get_by_date/$',
        event_get_subscriptions,
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
    # url(r'^get_by_range', event_get_subscriptions, name='api_event_get_by_range'),
]
