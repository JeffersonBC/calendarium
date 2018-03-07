from django.urls import path, re_path

from .views import event, invite

urlpatterns = [
    path(r'', event.list_event, name='event_calendar'),
    re_path(r'(\d+)/(\d+)/', event.list_event, name='event_calendar_date'),

    path(r'adicionar/', event.add_event, name='event_add'),
    re_path(r'editar/(\d+)/', event.edit_event, name='event_edit'),
    re_path(r'cancelar/(\d+)/', event.cancel_subscription_event,
            name='event_cancel_subscription'),

    re_path(r'convidar/(\d+)/', invite.invite_event, name='event_invite'),
    path(r'convites/', invite.invitations_event, name='event_invitations'),
    re_path(r'convites/aceitar/(\d+)/', invite.invite_accept_event,
            name='event_invite_accept'),
    re_path(r'convites/rejeitar/(\d+)/', invite.invite_reject_event,
            name='event_invite_reject'),

]
