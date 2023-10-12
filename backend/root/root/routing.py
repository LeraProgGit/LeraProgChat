from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from backend_api.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer.as_asgi()),
]
