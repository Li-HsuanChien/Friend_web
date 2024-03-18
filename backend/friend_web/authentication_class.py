from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        username_or_email = request.data.get('username_or_email')
        password = request.data.get('password')

        if not username_or_email or not password:
            return None

        # Attempt authentication with both email and username
        user = User.objects.filter(email=username_or_email).first()
        if not user:
            user = User.objects.filter(username=username_or_email).first()

        if user and user.check_password(password):
            return (user, None)
        else:
            raise AuthenticationFailed('Invalid username/email or password')
