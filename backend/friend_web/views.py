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

class UserRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset=Userdata.objects.all()
    lookup_field = 'username'
    serializer_class=UserDataSerializer
    
    
#use default search method http://127.0.0.1:8000/api/connections?inviter=1
# class ConnectionDataList(ListAPIView):
#     serializer_class=ConnectionSerializer
#     queryset = Connection.objects.all() 
#     lookup_field = 'username'
#     def get_queryset(self):
#         user = self.request.data.get('username')
#         queryset = Connection.objects.all()
#         return queryset.filter(inviter=user)
    
