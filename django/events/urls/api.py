from django.conf.urls import url
from ..views.api import event_add, event_get_subscriptions, event_teste

urlpatterns = [
    url(r'^add', event_add, name='api_event_add'),
    url(r'^get_by_date', event_get_subscriptions, name='api_event_get_by_date'),
    url(r'^teste', event_teste, name='api_event_teste'),
]
