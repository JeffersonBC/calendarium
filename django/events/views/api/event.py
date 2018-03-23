from django.contrib.auth import get_user_model
from django.db.models import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import json
from json import JSONDecodeError


from events.models import Event, EventSubscription, EventInvitation
from events.serializers.event import EventSerializer


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_add(request):
    success = True
    msg = ''

    # Tenta serializar dados recebidos num evento válido
    serializer = EventSerializer(
        data=request.data,
        context={'user': request.user}
    )
    success = serializer.is_valid()

    if success:
        event = serializer.save(creator=request.user.pk)
        EventSubscription(user=request.user, event=event).save()

        msg = 'Evento criado com sucesso.'

        return Response({
                'success': success,
                'msg': msg
            }, status=status.HTTP_201_CREATED
        )

    else:
        for key, value in serializer.errors.items():
            msg = msg.join(value)

        return Response({
                'success': success,
                'msg': msg
            }, status=status.HTTP_304_NOT_MODIFIED
        )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_update(request, event_id):
    event = get_object_or_404(Event, pk=event_id)

    success = True
    msg = ''

    serializer = EventSerializer(
        event,
        data=request.data,
        context={'user': request.user, 'instance': event}
    )
    success = serializer.is_valid()

    if success:
        event = serializer.save()
        msg = 'Evento atualizado com sucesso.'

        return Response({
                'success': success,
                'msg': msg
            }, status=status.HTTP_202_ACCEPTED
        )

    else:
        for key, value in serializer.errors.items():
            msg = msg.join(value)

        return Response({
                'success': success,
                'msg': msg
            }, status=status.HTTP_304_NOT_MODIFIED
        )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_delete(request, event_id):
    event = get_object_or_404(Event, pk=event_id)
    event.delete()

    return Response({
            'success': True,
            'msg': 'Evento deletado com sucesso.'
        }, status=status.HTTP_202_ACCEPTED
    )


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def event_get(request, event_id):
    event = get_object_or_404(Event, pk=event_id)

    return Response({
            'success': True,
            'msg': EventSerializer(event).data
        }, status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_subscriptions_list(request):
    success = True
    msg = ''

    json_request, error = json_from_request(request)

    if error:
        success = False
        msg = 'Não foi possível ler um JSON da requisição.'

    elif 'month' not in json_request or 'year' not in json_request:
        return Response({
                'success': False,
                'msg': 'Requisição não contém campos necessários.'
            }, status=status.HTTP_400_BAD_REQUEST
        )

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
                    sub.event.creator.first_name + ' ' +
                    sub.event.creator.last_name
                    if sub.event.creator != request.user
                    else None
                    # 'None' vira 'null' ao parsear em JSON
                ),
                'subscription_id': sub.id
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
        }, status=status.HTTP_200_OK
    )


# Processa o request para ver se ele apresenta um json válido
def json_from_request(request):
    error = False

    try:
        js = json.loads(request.body)
    except JSONDecodeError:
        error = True
        js = {}

    return js, error
