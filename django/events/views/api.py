from django.http import (
    HttpResponseBadRequest, HttpResponseForbidden
)
from django.contrib.auth import get_user_model
from django.db.models import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import json
from json import JSONDecodeError


from events.models import Event, EventSubscription, EventInvitation
from events.serializers.event import EventSerializer
from events.serializers.event_invitation import EventInvitationSerializer


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
        for index, sub in enumerate(event_subscriptions):
            msg.append({
                'event': EventSerializer(sub.event).data,
                'creator': (
                    sub.event.creator.first_name + sub.event.creator.last_name
                    if sub.event.creator != request.user else None
                    # 'None' vira 'null' ao parsear em JSON
                )
            })

            if sub.event.creator == request.user:
                subscribed = EventSubscription.objects.filter(event=sub.event)\
                    .exclude(user=request.user).count()

                invited = EventInvitation.objects.filter(event=sub.event)\
                    .exclude(rejected=True).count()

                rejected = EventInvitation.objects.filter(event=sub.event)\
                    .exclude(rejected=False).count()

                msg[index].update({
                    'invited': invited,
                    'subscribed': subscribed,
                    'rejected': rejected,
                })

    return Response({
        'success': success,
        'msg': msg
    })


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def event_invite_details(request, id):
    # Checagem de existência e permissão
    event = get_object_or_404(Event, id=id)

    if (event.creator != request.user):
        return HttpResponseForbidden()

    # Busca de informações
    subscribed = EventSubscription.objects.filter(event=event) \
        .exclude(user=request.user) \
        .values('user__id', 'user__first_name', 'user__last_name')

    invited = EventInvitation.objects.filter(event=event) \
        .exclude(rejected=True) \
        .values('user__id', 'user__first_name', 'user__last_name')

    rejected = EventInvitation.objects.filter(event=event) \
        .exclude(rejected=False) \
        .values('user__id', 'user__first_name', 'user__last_name')

    users = get_user_model().objects \
        .exclude(pk=request.user.pk) \
        .exclude(is_superuser=True) \
        .exclude(id__in=[subs['user__id'] for subs in subscribed]) \
        .exclude(id__in=[invt['user__id'] for invt in invited]) \
        .exclude(id__in=[rejc['user__id'] for rejc in rejected]) \


    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'text': user.first_name + ' ' + user.last_name
        })

    success = True
    msg = {}

    msg.update({
        'event': EventSerializer(event).data,
        'invitations': {
            'invited': invited,
            'subscribed': subscribed,
            'rejected': rejected
        },
        'users': user_list,
    })

    return Response({
        'success': success,
        'msg': msg
    })


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_invite_add(request, id):
    success = True
    msg = ''

    # Tenta extrair um json do request.
    # Se não for possível, retorna status de erro
    json_request, error = json_from_request(request)

    if error:
        success = False
        msg = 'Não foi possível ler um JSON da requisição.'

    else:
        serializer = EventInvitationSerializer(data=json_request)
        success = serializer.is_valid()

        if success:
            invitation = serializer.save(
                user=json_request['user'],
                event=json_request['event']
            )

            msg = 'Evento criado com sucesso'
        else:
            msg = serializer.errors

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
