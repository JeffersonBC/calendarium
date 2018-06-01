from django.conf.urls import url

from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    # verify_jwt_token
)
from accounts.api import (
    current_user,
    user_create,
    verify_token
)


urlpatterns = [
    url(
        r'^auth_token_get/$',
        obtain_jwt_token,
        name='api_auth_token_get'
    ),
    url(
        r'^auth_token_refresh/$',
        refresh_jwt_token,
        name='api_auth_token_refresh'
    ),
    url(
        r'^auth_token_verify/$',
        verify_token,
        name='api_auth_token_verify'
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
