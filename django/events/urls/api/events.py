from django.conf.urls import url

from events.views.api.event import (
    event_add,
    event_update,
    event_delete,
    event_get,
    event_subscriptions_list,
)


urlpatterns = [
    url(
        r'^add/$',
        event_add,
        name='api_event_add'
    ),
    url(
        r'^update/(?P<event_id>[0-9]+)/$',
        event_update,
        name='api_event_update'
    ),
    url(
        r'^delete/(?P<event_id>[0-9]+)/$',
        event_delete,
        name='api_event_delete'
    ),
    url(
        r'^get/(?P<event_id>[0-9]+)/$',
        event_get,
        name='api_event_get'
    ),
    url(
        r'^get_by_date/(?P<year>[0-9]+)/(?P<month>[0-9]+)/$',
        event_subscriptions_list,
        name='api_event_get_by_date'
    ),
    url(
        r'^get_by_date/(?P<year>[0-9]+)/$',
        event_subscriptions_list,
        name='api_event_get_by_date'
    ),
]
