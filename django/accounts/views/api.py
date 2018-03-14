from django.http import (
    JsonResponse, HttpResponseBadRequest, HttpResponseForbidden
)
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view

from ..serializers.user import UserSerializer


@api_view(['GET'])
def current_user(request):
    if not request.auth:
        return HttpResponseForbidden()

    return JsonResponse(
        UserSerializer(request.user).data
    )
