from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .event import json_from_request

from events.models import Event, EventSubscription, EventInvitation
from events.serializers.event import EventSerializer
from events.serializers.event_invitation import EventInvitationSerializer


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def event_invite_details(request, id):
    # Checagem de existência e permissão
    event = get_object_or_404(Event, id=id)

    if (event.creator != request.user):
        return Response({
                'success': False,
                'msg': 'Você não tem autorização para convidar outros usuários'
                       ' para este evento.'
            }, status=status.HTTP_403_FORBIDDEN
        )

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
        }, status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_invite_add(request, id):
    success = True
    msg = []

    # Tenta extrair um json do request.
    # Se não for possível, retorna status de erro
    json_request, error = json_from_request(request)

    if error:
        success = False
        msg = 'Não foi possível ler um JSON da requisição.'

    else:
        # Antes de mais nada, checa se evento existe.
        if not Event.objects.filter(id=json_request['event']).exists():
            msg.append(
                'Evento {0} não existe.'.format(json_request['event'])
            )

        # Se existe, checa se cada usuário existe, e se sim,
        # se já está convidado.
        else:
            user_ids = json_request['user'].split('|')

            for u_id in user_ids:
                if not get_user_model().objects.filter(id=u_id).exists():
                    msg.append(
                        'Usuário {0} não existe.'.format(u_id)
                    )

                elif EventInvitation.objects \
                        .filter(user_id=u_id) \
                        .filter(event_id=json_request['event']) \
                        .exists():

                    msg.append(
                        'Convite para o usuário {0} ao evento {1} já existe.'
                        .format(u_id, json_request['event'])
                    )

                # Se evento e usuário existem e usuário não está convidado
                # para o evento ainda, adiciona EventInvitation.
                else:
                    serializer = EventInvitationSerializer(data={})
                    success = serializer.is_valid()

                    if success:
                        invitation = serializer.save(
                            user=u_id,
                            event=json_request['event']
                        )

                        msg.append(
                            'Convite para o usuário {0} ao evento {1} criado '
                            'com sucesso.'.format(u_id, json_request['event'])
                        )

                    else:
                        msg.append(serializer.errors)

    return Response({
            'success': success,
            'msg': msg
        }, status=status.HTTP_201_CREATED
    )


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def event_invite_list(request):
    success = True
    msg = ''

    event_invitations = EventInvitation.objects \
        .filter(user_id=request.user) \
        .filter(rejected=False) \
        .order_by('event__start_datetime')

    msg = []
    for inv in event_invitations:
        msg.append({
            'event': EventSerializer(inv.event).data,
            'creator':
                inv.event.creator.first_name + ' ' +
                inv.event.creator.last_name,
            'invite_id': inv.id
        })

    return Response({
        'success': success,
        'msg': msg
    })


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_invite_accept(request, invitation_id):
    success = True
    msg = ''

    # Se a requisição está correta, checa se convite existe
    invitation = get_object_or_404(EventInvitation, pk=invitation_id)

    if (invitation.user != request.user):
        return Response({
                'success': False,
                'msg': 'Você não tem autorização para aceitar este convite.'
            }, status=status.HTTP_403_FORBIDDEN
        )

    # Se há conflito de horário com algum evento, retorna mensagem de erro
    conflicting_events = request.user.eventsubscription_set\
        .exclude(event__start_datetime__gte=invitation.event.end_datetime)\
        .exclude(event__end_datetime__lte=invitation.event.start_datetime)

    if conflicting_events.count() > 0:
        success = False

        evs = ''
        for e in conflicting_events:
            evs += '\n- ' + e.event.name

        msg = 'Não é possível aceitar este convite pois há conflito de' \
            ' horário com os seguintes eventos:' + evs

    # Se não há conflitos...
    else:
        subscription = EventSubscription(
            user=invitation.user, event=invitation.event)
        subscription.save()
        invitation.delete()

        msg = 'Inscrição no evento confirmada'

    return Response({
            'success': success,
            'msg': msg
        }, status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_invite_reject(request, invitation_id):
    invitation = get_object_or_404(EventInvitation, pk=invitation_id)

    if (invitation.user != request.user):
        return Response({
                'success': False,
                'msg': 'Você não tem autorização para rejeitar este convite.'
            }, status=status.HTTP_403_FORBIDDEN
        )

    else:
        invitation.rejected = True
        invitation.save()

    return Response({
            'success': True,
            'msg': 'Convite recusado com sucesso.'
        }, status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def event_invite_cancel(request, subscription_id):
    subscription = get_object_or_404(EventSubscription, pk=subscription_id)

    if (subscription.user != request.user):
        return Response({
                'success': False,
                'msg': 'Você não tem autorização para rejeitar este convite.'
            }, status=status.HTTP_403_FORBIDDEN
        )

    subscription.delete()

    return Response({
            'success': True,
            'msg': 'Inscrição cancelada com sucesso.'
        }, status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def event_invite_count(request):
    count = EventInvitation.objects \
        .filter(user_id=request.user) \
        .filter(rejected=False) \
        .count()

    return Response({
        'success': True,
        'msg': {
            'count': count
        }
    })