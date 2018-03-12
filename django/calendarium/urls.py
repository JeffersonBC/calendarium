from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('website.urls.website')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('eventos/', include('events.urls.events')),
    path('accounts/', include('website.urls.accounts')),
    path('accounts/', include('django.contrib.auth.urls')),
]
