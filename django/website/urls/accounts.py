from django.urls import path
# import django.contrib.auth.views as views

from website.views import registration

urlpatterns = [
    path('register/', registration.signup, name='register'),
]
