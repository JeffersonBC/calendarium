from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.timezone import now

from events.forms import EventForm
from events.models import Event, EventSubscription


@login_required
def list_event(request, month=now().month, year=now().year):
    return render(
        request,
        'events/event_list.html',
        {
            'event_subs':
                EventSubscription.objects
                                 .filter(user=request.user)
                                 .filter(event__start_datetime__month=month)
                                 .filter(event__start_datetime__year=year)
                                 .order_by('event__start_datetime'),
            'user': request.user,
            'month': str(month),
            'year': str(year),
        }
    )


@login_required
def add_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST, request=request)

        if form.is_valid():
            form.instance.creator = request.user
            form.save()

            event_subs = EventSubscription(user=request.user,
                                           event=form.instance)
            event_subs.save()

            return redirect('event_calendar')

    else:
        form = EventForm(request=request)

    return render(
        request,
        'events/event_change.html',
        {
            'form': form,
        }
    )


@login_required
def edit_event(request, pk):
    event = get_object_or_404(Event, pk=pk)

    if (event.creator != request.user):
        return HttpResponseForbidden()

    if request.method == 'POST':
        if 'delete_event' in request.POST:
            event.delete()
            return redirect('event_calendar')

        else:
            form = EventForm(request.POST, request=request, instance=event)
            if form.is_valid():
                form.save()

                return redirect('event_calendar')

    else:
        form = EventForm(request=request, instance=event)

    return render(
        request,
        'events/event_change.html',
        {
            'user': request.user,
            'form': form,
        }
    )


@login_required
def cancel_subscription_event(request, pk):
    subscription = get_object_or_404(EventSubscription, pk=pk)

    if (subscription.user != request.user):
        return HttpResponseForbidden()

    subscription.delete()

    return redirect('event_invitations')
