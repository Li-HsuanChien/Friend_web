from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from friend_web.models import Userdata, Connection 
from friend_web.serializers import UserDataSerializer, UserSerializer, ConnectionSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.generics import CreateAPIView

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserdataViewSet(viewsets.ModelViewSet):
    queryset = Userdata.objects.all()
    serializer_class = UserDataSerializer
    
class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

class UserCreate(CreateAPIView):
    serializer_class = UserDataSerializer
    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        bio = request.data.get('bio')
        headshot = request.data.get('headshot')
        gender = request.data.get('gender')
        show_horoscope = request.data.get('show_horoscope')
        instagram_link = request.data.get('instagram_link')
        facebook_link = request.data.get('facebook_link')
        snapchat_link = request.data.get('snapchat_link')
        inviteurl = request.data.get('inviteurl')
        return super().create(request, *args, **kwargs)   