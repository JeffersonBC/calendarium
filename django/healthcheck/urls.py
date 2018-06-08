from django.conf.urls import url

from healthcheck.api import health_check


urlpatterns = [
    url(r'^health_check/$', health_check, name='api_health_check')
]
