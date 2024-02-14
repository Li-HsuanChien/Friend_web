from django.contrib.auth.models import User
from friend_web.models import GenderType, Userdata, Connection, Inviterchannel, Inviteechannel
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = User
        fields = ['username']

        
class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    gender = serializers.StringRelatedField()
    username = serializers.StringRelatedField()
    class Meta:
        model = Userdata
        fields = ["username", "bio", "headshot", "gender",\
        "date_of_birth", "show_horoscope", "instagram_link", "facebook_link", "snapchat_link",\
            "inviteurl"]
        
class UserNameSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField()
    class Meta:
        model = Userdata
        fields = ('username', 'username_id')
        
        
class ConnectionSerializer(serializers.HyperlinkedModelSerializer):
    inviter = UserNameSerializer(many=True, read_only=True)
    invitee = UserNameSerializer(many=True, read_only=True)

    class Meta:
        model = Connection
        fields = ["inviter", "invitee", "date_established", "closeness", "nicknamechildtoparent", "nicknameparenttochild"]
        
        
class TokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(TokenObtainPairSerializer, cls).get_token(user)

        token['username'] = user.username
        return token
