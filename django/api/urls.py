from django.conf.urls import url, include

urlpatterns = [
    url(r'^events/', include('events.urls.api')),
]