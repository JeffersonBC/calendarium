from django.urls import path

from website.views import website

urlpatterns = [
    path('', website.index, name='index'),
]
