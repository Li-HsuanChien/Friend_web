from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth.models import User
from friend_web.models import Userdata, Connection 
from friend_web.serializers import UserDataSerializer, UserSerializer, ConnectionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import TokenObtainPairSerializer

class UserList(ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class UserDataList(ListAPIView):
    queryset = Userdata.objects.all()
    serializer_class = UserDataSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ('username', )
    
class ConnectionViewSet(ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ('inviter', )
    
class UserCreate(CreateAPIView):
    queryset=Userdata.objects.all()
    serializer_class = UserDataSerializer
    def create(self, request, *args, **kwargs):
        username = User.objects.get(username=request.user.username)
        bio = request.data.get('bio')
        headshot = request.data.get('headshot')
        gender = request.data.get('gender')
        show_horoscope = request.data.get('show_horoscope')
        instagram_link = request.data.get('instagram_link')
        date_of_birth = request.data.get('date_of_birth')
        facebook_link = request.data.get('facebook_link')
        snapchat_link = request.data.get('snapchat_link')
        inviteurl = request.data.get('inviteurl')
        return super().create(request, *args, **kwargs)

class UserRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset=Userdata.objects.all()
    lookup_field = 'username'
    serializer_class=UserDataSerializer
    
    
    
#registration

class ObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TokenObtainPairSerializer