from django import forms
from .models import Event, EventInvitation, EventSubscription


class EventForm(forms.ModelForm):
    start_datetime = forms.SplitDateTimeField(label='Início')
    end_datetime = forms.SplitDateTimeField(label='Término')

    class Meta:
        model = Event
        fields = ['name', 'description', 'start_datetime', 'end_datetime']

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(EventForm, self).__init__(*args, **kwargs)

    def clean_end_datetime(self):
        start_datetime = self.cleaned_data['start_datetime']
        end_datetime = self.cleaned_data['end_datetime']

        events = EventSubscription.objects \
            .filter(user=self.request.user) \
            .exclude(event__start_datetime__gte=end_datetime) \
            .exclude(event__end_datetime__lte=start_datetime) \
            .exclude(event__pk=self.instance.pk) \
            .order_by('event__start_datetime')

        if start_datetime > end_datetime:
            msg = 'O horário de término deve ser após o de início'
            raise forms.ValidationError(msg, code='invalid_end')

        # Mostra mensagem de erro com eventos conflitantes na tooptip do campo
        elif events.count() > 0:
            msg = 'O horário selecionado está conflitando com os seguintes ' \
                'eventos: '

            i = 0
            for e in events:
                i += 1
                msg += e.event.name
                if i < events.count():
                    msg += ', '

            raise forms.ValidationError(msg, code='invalid_conflict')

        return end_datetime


class EventInviteForm(forms.ModelForm):
    class Meta:
        model = EventInvitation
        fields = ['user']

    def clean_user(self):
        user = self.cleaned_data['user']
        event = self.instance.event

        invitations = EventInvitation.objects.filter(user=user) \
            .filter(event=event)
        subscriptions = EventSubscription.objects.filter(user=user) \
            .filter(event=event)

        if (invitations.count() > 0):
            msg = 'Este usuário já foi convidado para este evento'
            raise forms.ValidationError(msg, code='already_invited')

        elif (subscriptions.count() > 0):
            msg = 'Este usuário já está inscrito neste evento'
            raise forms.ValidationError(msg, code='already_subscribed')

        return user
