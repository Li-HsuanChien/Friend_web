from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, \
    ListAPIView, UpdateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from .permission import MaxAccessPermission
from django.db.models import Q
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from friend_web.models import Userdata, Connection
from .serializers import UserDataSerializer, UserSerializer, ConnectionSerializer, \
    TokenObtainPairSerializer, RegisterSerializer, ChangePasswordSerializer, PublicUserDataSerializer


authentication_level = IsAuthenticated
#TBD serve front end, image redering, tests


class UserDataList(ListAPIView):
    """_summary_
        Admin privilliged all user data list
    Args:
        IsAdminUser
    """
    queryset = Userdata.objects.all()
    serializer_class = UserDataSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ('username', )
    permission_classes = (IsAdminUser,)

class CurrentUser(APIView):
    """_summary_
        takes request user id
        returns current logged-in user name and id
    Args:
        self.request.user.id
    Returns:
        JSON:{
                    "username": <string>,
                    "id": <int>
                }
        example: {
                    "username": "U2",
                    "id": 9
                }
    """
    serializer_class = UserSerializer
    permission_classes = (authentication_level,)

    def get(self, request):
        user_id = request.user.id
        try:
            user_instance = User.objects.get(id=user_id)
            serializer = self.serializer_class(user_instance)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
class TargetUser(APIView):
    """_summary_
        takes request data username
        returns targeted user username and id
    Args:
        request.data.get('username')
    Returns:
        JSON:{
                    "username": <string>,
                    "id": <int>
                }
        example: {
                    "username": "U2",
                    "id": 9
                }
    """
    serializer_class = UserSerializer
    permission_classes = (MaxAccessPermission,)

    def post(self, request):
        username = request.data.get('username')
        try:
            user_instance = User.objects.get(username=username)
            userdata = Userdata.objects.filter(username=user_instance)
            serializer = self.serializer_class(user_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist or Userdata.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

class SearchUserName(ListAPIView):
    """_summary_
    returns all user's id name and headshoot that contains search substring
    Args:
        request.data.get("search")
        Example:
            {"search": "U"}
    Returns:
    Example:
        [
            {
                "username": "U6",
                "headshot": null,
                "username_id": 7
            },
            {
                "username": "U3",
                "headshot": "/img/headshots/IMG_0905_GSB8BGe.JPG",
                "username_id": 8
            },
            {
                "username": "U2",
                "headshot": "/img/headshots/IMG_0905_sHJnMjn.JPG",
                "username_id": 9
            },
            {
                "username": "U1",
                "headshot": "/img/headshots/IMG_0905_nIlVA1z.JPG",
                "username_id": 10
            },
            {
                "username": "U1111",
                "headshot": null,
                "username_id": 20
            },
            {
                "username": "Serious",
                "headshot": null,
                "username_id": 26
            }
        ]
    """
    queryset = Userdata.objects.all()
    permission_classes = (authentication_level,)
    def post(self, request, *args, **kwargs):
        search = request.data.get("search")
        if search:
            output = []
            users = User.objects.filter(username__icontains=search)
            for user in users:
                userdata = Userdata.objects.filter(username=user)
                if userdata.exists():
                    serializer = PublicUserDataSerializer(userdata.first())
                    output.append(serializer.data)
            return Response(output, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No search query provided"}, status=status.HTTP_400_BAD_REQUEST)

class ConnectionList(APIView):
    """
    Takes input user id and returns target user's child connections.
    """

    permission_classes = (MaxAccessPermission,)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({'error': 'user_id parameter is required'}, status=400)

        query = Connection.objects.filter(Q(inviter=user_id) | Q(invitee=user_id))
        serializer = ConnectionSerializer(query, many=True)
        return Response(serializer.data)

class TargetUserData(APIView):
    """_summary_
        returns targer user data by inputing target user_id
    Args:
        user_id = request.data.get('user_id')
    Returns:
        example: {
            "username": "U1",
            "username_id": "10"
            "bio": "I am U1 programmed",
            "headshot": "/img/headshots/IMG_0905_nIlVA1z.JPG",
            "gender": "M",
            "date_of_birth": "2000-02-01",
            "show_horoscope": true,
            "instagram_link": "http://www.filler.com",
            "facebook_link": "http://www.filler.com",
            "snapchat_link": "http://www.filler.com",
            "inviteurl": "http://www.filler.com",
            "created_time": "2024-02-14T09:52:45Z"
        }
    """
    serializer_class = UserDataSerializer
    permission_classes = (MaxAccessPermission,)

    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            user_instance = Userdata.objects.get(username_id=user_id)
            serializer = self.serializer_class(user_instance)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

class UserCreate(CreateAPIView):
    """_summary_
        takes user id
        construct userdata
    Args:
        user_id = request.user.id
        gender = request.data.get('gender') choice field
        show_horoscope = request.data.get('show_horoscope') boolean
        date_of_birth = request.data.get('date_of_birth') YYYY-MM-DD
    Returns:
        Example: {
            "username": "U6",
            "bio": null,
            "headshot": null,
            "gender": "F",
            "date_of_birth": "2011-09-12",
            "show_horoscope": false,
            "instagram_link": null,
            "facebook_link": null,
            "snapchat_link": null,
            "inviteurl": "https://www.localhost:8000/U6",
            "created_time": "2024-02-22T00:57:25.036276Z"
        }
    """
    queryset=Userdata.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = (authentication_level,)
    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        user_instance = User.objects.get(id=user_id)

        # bio = request.data.get('bio')
        # headshot = request.data.get('headshot')
        gender = request.data.get('gender')
        show_horoscope = request.data.get('show_horoscope')
        # instagram_link = request.data.get('instagram_link')
        date_of_birth = request.data.get('date_of_birth')
        # facebook_link = request.data.get('facebook_link')
        # snapchat_link = request.data.get('snapchat_link')
        inviteurl = f"https://www.localhost:8000/inviteurl/{user_instance}"

        userdata_instance = Userdata.objects.create(
            username=user_instance,

            gender=gender,
            show_horoscope=show_horoscope,
            date_of_birth=date_of_birth,
            inviteurl=inviteurl,
            # instagram_link=instagram_link,
            # bio=bio,
            # headshot=headshot,
            # facebook_link=facebook_link,
            # snapchat_link=snapchat_link,
            #created_time=created_time
        )

        # Now you can return the response
        serializer = UserDataSerializer(userdata_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CurrentUserRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    """_summary_
        edit's user data
    Args:
        "bio": request.data.get('bio') string
        "headshot": request.data.get('headshot') image(file)
        "gender": request.data.get('gender') restricted string
        "date_of_birth": request.data.get('date_of_birth') YYYY-MM-DD
        "show_horoscope": request.data.get('show_horoscope') boolean
        "instagram_link": request.data.get('instagram_link') url
        "facebook_link": request.data.get('facebook_link') url
        "snapchat_link": request.data.get('snapchat_link') url
        "inviteurl": request.data.get('inviteurl')
    Returns:
        Example:{
            "username": "U6",
            "bio": "I am altered",
            "headshot": null,
            "gender": "NA",
            "date_of_birth": "2011-05-16",
            "show_horoscope": false,
            "instagram_link": "http://www.example.com",
            "facebook_link": "http://www.example.com",
            "snapchat_link": "http://www.example.com",
            "inviteurl": "https://www.localhost:8000/U6",
            "created_time": "2024-02-22T00:57:25.036276Z"
        }
    """
    queryset = Userdata.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = (authentication_level,)

    def get_object(self):
        user = self.request.user.id
        # Ensure Userdata instance exists for the user
        userdata_instance = get_object_or_404(Userdata, username=user)
        return userdata_instance

    def put(self, request, *args, **kwargs):
        userdata_instance = self.get_object()
        fields_to_update = ['bio', 'headshot', 'gender', 'date_of_birth', 'show_horoscope',
                    'instagram_link', 'facebook_link', 'snapchat_link']

        for field_name in fields_to_update:
            field_value = request.data.get(field_name)
            if field_value is not None:
                setattr(userdata_instance, field_name, field_value)
        setattr(userdata_instance, 'inviteurl', f"https://www.localhost:8000/inviteurl/{request.user.id}")

        # Save the changes to the user_instance
        userdata_instance.save()

        serializer = self.serializer_class(userdata_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # This will update the instance
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ConnectionCreate(CreateAPIView):
    """_summary_
    takes current user as invitee, get inviter id and closeness
    from request
    returns successful connection add
    Args:
        "closeness:(request.data.get('closeness'))
            ('friend', 'Friend'),
            ('closefriend', 'Close Friend'),
            ('bestfriend', 'Best Friend'),"
        "inviter(id)": (request.user.id)
        "invitee(id)": (request.data.get('invitee_id'))
        example: {"closeness": "bestfriend",
        		  "invitee_id:"10"
            	}
    Returns:
        example:{
                "id": 4,
                "date_established": "2024-02-22T00:44:30.241799Z",
                "closeness": "bestfriend",
                "nicknamechildtoparent": null,
                "nicknameparenttochild": null,
                "inviter": 9,
                "invitee": 10
            }
    """
    queryset=Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = (authentication_level,)
    def create(self, request, *args, **kwargs):
        current_user_id = request.user.id
        closness = request.data.get('closeness')
        invitee_id = request.data.get('invitee_id')
        inviter_instance = Userdata.objects.get(username=current_user_id)
        invitee_instance = Userdata.objects.get(username=invitee_id)

        duplicate_connenction = Connection.objects.filter(inviter_id=inviter_instance,\
            invitee=invitee_instance)
        reversed_connection = Connection.objects.filter(inviter_id=invitee_instance,\
            invitee=inviter_instance)

        if(duplicate_connenction.exists()):
            return Response({"error": "connection exists"}, status=status.HTTP_400_BAD_REQUEST)
        if(reversed_connection.exists()):
            return Response({"error": "reversed connection exists"}, status=status.HTTP_400_BAD_REQUEST)
        userdata_instance = Connection.objects.create(
                closeness= closness,
                inviter= inviter_instance,
                invitee= invitee_instance
            )
        serializer = ConnectionSerializer(userdata_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ConnectionRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView, ):
    """_summary_
        edits single self connection,
        takes user's side to determine whether edit nicknametochild or parent and closness
    Args:
        self.request.data.get('connection_id')
        self.request.data.get('closeness'):
            ('friend', 'Friend')
            ('closefriend', 'Close Friend')
            ('bestfriend', 'Best Friend')
        self.request.data.get('nickname')
        Example1(PUT): {"connection_id": "2"}
        Example2(PUT):{"connection_id": "2",
                    "nickname": "edited nick name",
                    "closeness": "bestfriend"
                 }
        Example3(DELETE): {"connection_id": "9"}
    Returns:
        Example1: {
            "id": 2,
            "date_established": "2024-02-20T20:32:46.863427Z",
            "closeness": "friend",
            "nicknamechildtoparent": "U1toU2",
            "nicknameparenttochild": null,
            "activated": false,
            "inviter": 9,
            "invitee": 10
            }
        Example2: {
                "id": 2,
                "date_established": "2024-02-20T20:32:46.863427Z",
                "closeness": "bestfriend",
                "nicknamechildtoparent": "edited nick name",
                "nicknameparenttochild": null,
                "activated": false,
                "inviter": 9,
                "invitee": 10
            }
        Example3: {

        }
    """
    serializer_class = ConnectionSerializer
    permission_classes = (MaxAccessPermission,)
    def get_object(self):
        connection_id = self.request.data.get('connection_id')
        # Ensure Userdata instance exists for the user
        userdata_instance = get_object_or_404(Connection, id=connection_id)
        return userdata_instance

    def put(self, request, *args, **kwargs):
        current_user_id = self.request.user.id
        connection_instance = self.get_object()
        connection_instance.activated = True
        if connection_instance.inviter_id == current_user_id:
            nicknameparenttochild = self.request.data.get('nickname')
            closeness = self.request.data.get('closeness')
            if nicknameparenttochild:
                connection_instance.nicknameparenttochild = nicknameparenttochild
            if closeness:
                connection_instance.closeness = closeness
        elif connection_instance.invitee_id == current_user_id:
            nicknamechildtoparent = self.request.data.get('nickname')
            closeness = self.request.data.get('closeness')
            if nicknamechildtoparent:
                connection_instance.nicknamechildtoparent = nicknamechildtoparent
            if closeness:
                connection_instance.closeness = closeness
        else:
            return Response({'message': 'user not part of connection'}, status=status.HTTP_400_BAD_REQUEST)

        connection_instance.save()
        #check user status allow edit accordingly
        serializer = self.serializer_class(connection_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # This will update the instance
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        connection_instance = self.get_object()
        self.perform_destroy(connection_instance)
    	  # This will update the instance
        return Response({"message": "connection deleted!"}, status=status.HTTP_204_NO_CONTENT)


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
        except:
            return Response({'message': 'Action Failed!' }, 406)

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
