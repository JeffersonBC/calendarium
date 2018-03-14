from django.http import (
    HttpResponseBadRequest, HttpResponseForbidden
)
from django.db.models import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import json
from json import JSONDecodeError

from events.models import Event, EventSubscription
from events.serializers.event import EventSerializer


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def event_teste(request):
    return Response({'success': True})


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_add(request):
    success = True
    msg = ''
    errors = ''

    # Tenta extrair um json do request.
    # Se não for possível, retorna status de erro
    json_request, error = json_from_request(request)

    if error:
        success = False
        errors = 'Não foi possível ler um JSON da requisição.'

    else:
        serializer = EventSerializer(data=json_request)

        success = serializer.is_valid()

        if success:
            serializer.save()
            msg = 'Evento criado com sucesso'
        else:
            errors = serializer.errors

    return Response({
        'success': success,
        'msg': msg,
        'errors': errors
    })


# Processa o request para ver se ele apresenta um json válido
def json_from_request(request):
    error = False

    try:
        js = json.loads(request.body)
    except JSONDecodeError:
        error = True
        js = {}

    return js, error
