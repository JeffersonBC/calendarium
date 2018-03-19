from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.shortcuts import render, redirect, get_object_or_404

from events.forms import EventInviteForm
from events.models import Event, EventSubscription, EventInvitation


@login_required
def invite_event(request, pk):
    event = get_object_or_404(Event, pk=pk)

    subscribed = EventSubscription.objects.filter(event=event) \
        .exclude(user=request.user)

    invited = EventInvitation.objects.filter(event=event) \
        .exclude(rejected=True)

    rejected = EventInvitation.objects.filter(event=event) \
        .exclude(rejected=False)

    if (event.creator != request.user):
        return HttpResponseForbidden()

    if request.method == 'POST':
        form = EventInviteForm(request.POST)

        form.instance.event = event

        if form.is_valid():
            form.save()

            return redirect('event_calendar')

    else:
        form = EventInviteForm()

    form.fields['user'].queryset = get_user_model().objects \
        .exclude(pk=request.user.pk) \
        .exclude(is_superuser=True) \
        .exclude(id__in=[subs.user.id for subs in subscribed]) \
        .exclude(id__in=[invt.user.id for invt in invited]) \
        .exclude(id__in=[rejc.user.id for rejc in rejected]) \

    return render(
        request,
        'events/event_invite.html',
        {
            'pk': pk,
            'form': form,
            'event': event,
            'invited': invited,
            'subscribed': subscribed,
            'rejected': rejected,
        }
    )


@login_required
def invitations_event(request):
    invitations = request.user.eventinvitation_set.filter(rejected=False)

    return render(
        request,
        'events/event_invitations.html',
        {
            'invitations': invitations,
        }
    )


@login_required
def invite_accept_event(request, pk):
    invitation = get_object_or_404(EventInvitation, pk=pk)

    if (invitation.user != request.user):
        return HttpResponseForbidden()

    conflicting_events = request.user.eventsubscription_set \
        .exclude(event__start_datetime__gte=invitation.event.end_datetime) \
        .exclude(event__end_datetime__lte=invitation.event.start_datetime)

    if conflicting_events.count() > 0:
        msg = ''
        for e in conflicting_events:
            msg += '\n- ' + e.event.name

        messages.add_message(
            request, messages.ERROR,
            "Não é possível aceitar este convite pois há conflito de horário" +
            " com os seguintes eventos:" + msg,
            extra_tags='',
        )

    else:
        subscription = EventSubscription(
            user=invitation.user, event=invitation.event)
        subscription.save()
        invitation.delete()

    return redirect('event_invitations')


@login_required
def invite_reject_event(request, pk):
    invitation = get_object_or_404(EventInvitation, pk=pk)

    if (invitation.user != request.user):
        return HttpResponseForbidden()

    else:
        invitation.rejected = True
        invitation.save()

    return redirect('event_invitations')
