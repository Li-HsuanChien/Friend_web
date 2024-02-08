from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static, serve
from django.urls import re_path, include
from django.urls import include, path
from rest_framework import routers

from friend_web import views
#from friend_web.views import 

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'data', views.UserdataViewSet)
router.register(r'connection', views.ConnectionViewSet)
import friend_web.views

urlpatterns = [
    path('admin/', admin.site.urls),
    #re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT}),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-auth/data/add', friend_web.views.UserCreate.as_view())
]

urlpatterns += router.urls