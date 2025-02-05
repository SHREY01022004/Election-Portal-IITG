from rest_framework.authentication import BasicAuthentication,SessionAuthentication
from dj_rest_auth.jwt_auth import JWTAuthentication,JWTCookieAuthentication
from django.conf import settings

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


default_authentication_classes =[CsrfExemptSessionAuthentication]
default_authentication_classes += [JWTCookieAuthentication,JWTAuthentication]