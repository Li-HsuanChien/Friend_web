from django.contrib.auth.models import User
from friend_web.models import Userdata, Connection #GenderType
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'id']
# class GenderTypeSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = GenderType
#         fields = ['label',]


class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    # gender = GenderTypeSerializer()
    username = serializers.StringRelatedField()
    class Meta:
        model = Userdata
        fields = ["username", "bio", "headshot", "gender",\
        "date_of_birth", "show_horoscope", "instagram_link", "facebook_link", "snapchat_link",\
            "inviteurl", "created_time"]
        
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
        

#registration         
class TokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(TokenObtainPairSerializer, cls).get_token(user)

        token['username'] = user.username
        return token

class RegisterSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance

