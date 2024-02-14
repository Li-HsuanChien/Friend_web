from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static, serve
from django.urls import re_path, include
from django.urls import include, path
from rest_framework import routers

from friend_web import views
import friend_web.views


# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'data', views.UserdataViewSet)
# router.register(r'connection', views.ConnectionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    #re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT}),
    # path('', include(router.urls)),
    #path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/users/', friend_web.views.UserList.as_view()),
    path('api/userdatas', friend_web.views.UserDataList.as_view()),
    path('api/userdatas/add', friend_web.views.UserCreate.as_view()),
    path('api/userdatas/<int:username>', friend_web.views.UserRetrieveUpdateDestroy.as_view()),
    path('api/connections', friend_web.views.ConnectionViewSet.as_view()),
    #path('api/user/<str:username>/', friend_web.views.UserRetrieveUpdateDestroy.as_view())
    #path('api/user/<str:username>/connections', friend_web.views.ConnectionDataList.as_view())
    #path('api-auth/userdatas', friend_web.views.UserDataList.as_view()),
    
]

#urlpatterns += router.urls