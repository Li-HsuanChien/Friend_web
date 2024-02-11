from django.contrib.auth.models import User
from friend_web.models import GenderType, Userdata, Connection
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = User
        fields = ['username']

        
class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    gender = serializers.StringRelatedField()
    username = UserSerializer(required=True)
    class Meta:
        model = Userdata
        fields = ["username", "bio", "headshot", "gender",\
        "date_of_birth", "show_horoscope", "instagram_link", "facebook_link", "snapchat_link",\
            "inviteurl"]
        
        
class ConnectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Connection
        fields = ["inviter", "invitee", "date_established", "usedurl", "closeness", "nicknametoparent", "nicknametochild"]
        
        