from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.generics import ListCreateAPIView
from rest_framework.authtoken import views as rest_framework_views

from ..views.api import current_user

urlpatterns = [
    url(r'^get_auth_token/$', rest_framework_views.obtain_auth_token,
        name='get_auth_token'),
    url(r'^get_current_user/$', current_user, name='get_current_user')

]
