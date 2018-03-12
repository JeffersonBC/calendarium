from django.conf.urls import url
from ..views.api import event_add, event_teste

urlpatterns = [
    url(r'^add', event_add, name='api_events_add'),
    url(r'^teste', event_teste, name='api_events_teste'),
]
