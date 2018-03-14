from django.db import models
from django.contrib.auth import get_user_model
from django.utils.timezone import now


class Event(models.Model):
    name = models.CharField(verbose_name="Nome", max_length=254)
    description = models.TextField(verbose_name="Descrição", blank=True)
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    start_datetime = models.DateTimeField(
        'Início',
        default=now,
        blank=False,
    )
    end_datetime = models.DateTimeField(
        'Término',
        default=now,
        blank=False,
    )

    def __str__(self):
        return (
            self.name + ': ' + str(self.start_datetime)
        )

    def set_creator(self, creator_pk):
        self.creator = get_user_model().objects.get(pk=creator_pk)


class EventSubscription(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return (str(self.user) + ' - ' + str(self.event))


class EventInvitation(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        verbose_name='Usuário',
        on_delete=models.CASCADE,
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    rejected = models.BooleanField(default=False)

    def __str__(self):
        return (str(self.user) + ' invited to ' + str(self.event) +
                '(refused? ' + str(self.rejected) + ')')
