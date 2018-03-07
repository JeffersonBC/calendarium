from django import template

register = template.Library()


@register.inclusion_tag('templatetags/invitation_count.html')
def invitation_count(user, **kwargs):
    return {
        'count': user.eventinvitation_set.filter(rejected=False).count()
    }
