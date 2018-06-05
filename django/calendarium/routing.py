from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import OriginValidator

from accounts.token_auth_middleware import TokenAuthMiddlewareStack

import events.routing.invite


application = ProtocolTypeRouter(
    {
        # http -> django views is added by default
        'websocket': OriginValidator(
            URLRouter(
                events.routing.invite.websocket_urlpatterns
            )
        ),
        ["calendarium.jeffersonbc.com"]
    }
)
