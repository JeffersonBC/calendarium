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

    # Tenta extrair um json do request.
    # Se não for possível, retorna status de erro
    json_request, error = json_from_request(request)

    if error:
        success = False
        msg = 'Não foi possível ler um JSON da requisição.'

    else:
        serializer = EventSerializer(data=json_request)
        success = serializer.is_valid()

        if success:
            event = serializer.save(creator=request.user.pk)
            EventSubscription(user=request.user, event=event).save()

            msg = 'Evento criado com sucesso'
        else:
            msg = serializer.errors

    return Response({
        'success': success,
        'msg': msg
    })


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_get_subscriptions(request):
    success = True
    msg = ''

    json_request, error = json_from_request(request)

    if error:
        success = False
        msg = 'Não foi possível ler um JSON da requisição.'

    elif 'month' not in json_request or 'year' not in json_request:
        return HttpResponseBadRequest()

    else:
        event_subscriptions = EventSubscription.objects \
            .filter(user_id=request.user) \
            .filter(event__start_datetime__month=json_request['month']) \
            .filter(event__start_datetime__year=json_request['year']) \
            .order_by('event__start_datetime')

        msg = []
        for idx, subs in enumerate(event_subscriptions):
            msg.append(EventSerializer(subs.event).data)

    return Response({
        'success': success,
        'msg': msg
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
