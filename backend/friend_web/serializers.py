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
        
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Userdata.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.username = validated_data.get('username', instance.username)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.headshot = validated_data.get('headshot', instance.headshot)
        instance.created_time = validated_data.get('created_time', instance.created_time)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.show_horoscope = validated_data.get('show_horoscope', instance.show_horoscope)
        instance.instagram_link = validated_data.get('instagram_link', instance.instagram_link)
        instance.facebook_link = validated_data.get('facebook_link', instance.facebook_link)
        instance.snapchat_link = validated_data.get('snapchat_link', instance.snapchat_link)
        instance.inviteurl = validated_data.get('inviteurl', instance.inviteurl)
        instance.save()
        return instance
        
class ConnectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Connection
        fields = ["inviter", "invitee", "date_established", "usedurl", "closeness", "nicknametoparent", "nicknametochild"]
        
        