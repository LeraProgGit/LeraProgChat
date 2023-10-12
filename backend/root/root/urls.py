from django.contrib import admin
from django.urls import path, include
from . import routing

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend_api.urls')),
]
