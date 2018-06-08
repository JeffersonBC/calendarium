from django.conf.urls import url, include

urlpatterns = [
    url(r'^accounts/', include('accounts.urls')),
    url(r'^events/', include('events.urls.events')),
    url(r'^events/', include('events.urls.invite')),
    url(r'^health_check/', include('healthcheck.urls')),
]
