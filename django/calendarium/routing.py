from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

from accounts.token_auth_middleware import TokenAuthMiddlewareStack

import events.routing.invite


application = ProtocolTypeRouter(
    {
        # http -> django views is added by default
        'websocket': URLRouter(
            events.routing.invite.websocket_urlpatterns
        )
    }
)
