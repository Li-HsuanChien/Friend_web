from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.conf.urls.static import static, serve
from django.urls import re_path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT})
]
