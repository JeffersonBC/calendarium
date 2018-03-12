from django.conf.urls import url, include

urlpatterns = [
    url(r'^accounts/', include('accounts.urls.api')),
    url(r'^events/', include('events.urls.api')),
]