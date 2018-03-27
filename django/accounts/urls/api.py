from django.conf.urls import url

from rest_framework.authtoken import views as rest_framework_views

from accounts.views.api import current_user, user_create


urlpatterns = [
    url(
        r'^auth_token_get/$',
        rest_framework_views.obtain_auth_token,
        name='api_auth_token_get'
    ),
    url(
        r'^user_get_current/$',
        current_user,
        name='api_user_get'
    ),
    url(
        r'^user_create/$',
        user_create,
        name='api_user_create'
    )

]
