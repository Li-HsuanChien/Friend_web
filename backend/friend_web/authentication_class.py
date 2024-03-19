
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class CustomAuthentication(ModelBackend):
    def authenticate_header(self, request):
        """
        Return a string to be used as the value of the WWW-Authenticate
        header in a HTTP 401 Unauthorized response, or None if the backend
        does not support this.
        """
        return 'Custom'

    def authenticate(self, request, **kwargs):
        UserModel = get_user_model()
        try:
            email = kwargs.get('email', None)
            if email is None:
                email = kwargs.get('username', None)
            user = UserModel.objects.get(email=email)
            if user.check_password(kwargs.get('password', None)):
                return user
        except UserModel.DoesNotExist:
            return None
        return None
