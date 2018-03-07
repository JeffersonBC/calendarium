from django import template

register = template.Library()


@register.inclusion_tag('templatetags/event_invitation_count.html')
def event_invitation_count(event, user, **kwargs):
    return {
        'confirmed': event.eventsubscription_set.exclude(user=user).count(),
        'pending': event.eventinvitation_set.filter(rejected=False).count(),
        'denied': event.eventinvitation_set.filter(rejected=True).count(),
    }
