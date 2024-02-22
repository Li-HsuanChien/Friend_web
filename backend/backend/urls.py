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

    #returns current logined user name and id {"username": {}, "id": {}}
    path('api/currentuser', friend_web.views.CurrentUser.as_view()),
    #returns all userdatas(admin restricted)
    path('api/adminonly/userdatas', friend_web.views.UserDataList.as_view()),
    #returns user data by inputing user_id
    path('api/userdata', friend_web.views.TargetUserData.as_view()),
    #add current user userdata
    path('api/userdatas/add', friend_web.views.UserCreate.as_view()),
    #update current user userdata
    path('api/userdatas/update', friend_web.views.CurrentUserRetrieveUpdateDestroy.as_view()),
    #returns all child connections
    path('api/connections', friend_web.views.ConnectionViewSet.as_view()),
    #adds connection by getting "closeness('friend', 'Friend'),"inviter(id)", invitee is the current user
    #consider front end invite or backend
    path('api/connections/add', friend_web.views.ConnectionCreate.as_view()),
    #edits connections, takes user side to determine whether edit nicknametochild or parent and closness
    path('api/connections/edit', friend_web.views.ConnectionRetrieveUpdateDestroy.as_view()),
    #login url takes username and pass returns jwt
    path('api/login', friend_web.views.ObtainTokenPairView.as_view(), name='token_obtain_pair'),
    #returns Token refreshview
    path('api/login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    #register takes username pass pass2
    path('api/register', friend_web.views.RegisterView.as_view(), name='auth_register'),
    #change password consider email or two-auth
    path('api/change_password/<int:pk>/', friend_web.views.ChangePasswordView.as_view(), name='auth_change_password'),
    #black list jwt token
    path('api/logout', friend_web.views.LogoutView.as_view(), name='auth_logout'),

    #path('api/user/<str:username>/connections', friend_web.views.ConnectionDataList.as_view())

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#urlpatterns += router.urls
