from rest_framework import permissions, generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, \
    ListAPIView, UpdateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth.models import User
from friend_web.models import Userdata, Connection 
from .serializers import UserDataSerializer, UserSerializer, ConnectionSerializer, \
    TokenObtainPairSerializer, RegisterSerializer, ChangePasswordSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

autentication_level = AllowAny

class UserList(ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (autentication_level,)
    
class UserDataList(ListAPIView):
    queryset = Userdata.objects.all()
    serializer_class = UserDataSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ('username', )
    permission_classes = (autentication_level,)
    
class ConnectionViewSet(ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    filterset_fields = ('inviter',)
    lookup_field = 'inviter'
    permission_classes = (autentication_level,)
    #connections?inviter=<int:username_id> Migrate to sort to user based restriction

#TBD Gender    
class UserCreate(CreateAPIView):
    queryset=Userdata.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = (AllowAny,)
    def create(self, request, *args, **kwargs):
        username = User.objects.get(username=request.user.username)
        bio = request.data.get('bio')
        headshot = request.data.get('headshot')
        gender_id = request.data.get('gender_id')
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
    

#TBD https://amir.rachum.com/a-case-for-a-onetomany-relationship-in-django/ Add data with postman now
class ConnectionCreate(CreateAPIView):
    queryset=Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = (AllowAny,)
    # def create(self, request, *args, **kwargs):
    #     username = User.objects.get(username=request.user.username)
    #     bio = request.data.get('bio')
    #     headshot = request.data.get('headshot')
    #     gender_id = request.data.get('gender_id')
    #     show_horoscope = request.data.get('show_horoscope')
    #     instagram_link = request.data.get('instagram_link')
    #     date_of_birth = request.data.get('date_of_birth')
    #     facebook_link = request.data.get('facebook_link')
    #     snapchat_link = request.data.get('snapchat_link')
    #     inviteurl = request.data.get('inviteurl')
    #     return super().create(request, *args, **kwargs)  
    
#User management

class ObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TokenObtainPairSerializer
    
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
            return Response({'message': 'User Created!' })
        except:
            return Response({'message': 'Action Failed!' })
        
class ChangePasswordView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    
    def update(self, request, *args, **kwargs):
        try:
            super().update(request, *args, **kwargs)
            return Response({'message': 'Password updated!' })
        except:
            return Response({'message': 'Action Failed!' })

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)