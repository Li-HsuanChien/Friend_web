from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static, serve
from django.urls import re_path, include
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from friend_web import views
import friend_web.views
from django.conf import settings
from django.conf.urls.static import static



# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'data', views.UserdataViewSet)
# router.register(r'connection', views.ConnectionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    #re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT}),
    # path('', include(router.urls)),
    #path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/currentuser', friend_web.views.UserList.as_view()),
    path('api/userdatas', friend_web.views.UserDataList.as_view()),
    path('api/userdatas/add', friend_web.views.UserCreate.as_view()),
    path('api/userdatas/update', friend_web.views.UserRetrieveUpdateDestroy.as_view()),
    path('api/connections', friend_web.views.ConnectionViewSet.as_view()),
    path('api/connections/add', friend_web.views.ConnectionCreate.as_view()),
    path('api/connections/edit', friend_web.views.ConnectionRetrieveUpdateDestroy.as_view()),
    path('api/login', friend_web.views.ObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register', friend_web.views.RegisterView.as_view(), name='auth_register'),
    path('api/change_password/<int:pk>/', friend_web.views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('api/logout', friend_web.views.LogoutView.as_view(), name='auth_logout'),

    #path('api/user/<str:username>/connections', friend_web.views.ConnectionDataList.as_view())

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#urlpatterns += router.urls
