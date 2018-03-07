from django.shortcuts import render
from django.utils.timezone import now


def index(request):
    next_events = {}
    if request.user.is_authenticated:
        next_events = request.user.eventsubscription_set \
            .filter(event__start_datetime__gte=now()) \
            .order_by('event__start_datetime')[:6]

    return render(
        request,
        'website/index.html',
        {
            'next_events': next_events,
            'now': now()
        }
    )
