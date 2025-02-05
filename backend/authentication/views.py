from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import MicrosoftGraphOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework  import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.utils.decorators import method_decorator
from django.db import transaction
from .default_authentication_classes import CsrfExemptSessionAuthentication
from django.http import HttpResponseRedirect
from main.models import Election
from django.conf import settings

class TokenVerifyView(GenericAPIView):
    authentication_classes = [CsrfExemptSessionAuthentication,JWTCookieAuthentication]

    def get(self,request):
        if request.user.is_authenticated:
            return Response({"isLoggedIn":True,"detail":"User is logged in!"},status=status.HTTP_200_OK)
        return Response({"isLoggedIn":False,"detail":"User not logged in!"},status=status.HTTP_200_OK)

@method_decorator(transaction.atomic,name="dispatch")
class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
    adapter_class = GoogleOAuth2Adapter

@method_decorator(transaction.atomic,name="dispatch")
class MicrosoftLogin(SocialLoginView):
    adapter_class = MicrosoftGraphOAuth2Adapter


class LoginRedirectView(GenericAPIView):
    authentication_classes = [CsrfExemptSessionAuthentication,JWTCookieAuthentication]

    def get(self,request):
        if request.user.is_authenticated:
            try:
                election = Election.objects.all().first()
                is_organizer = election.organizers.filter(user__id=request.user.euser.id).exists()
            except:
                is_organizer=False
            url = settings.CLIENT_URL

            if is_organizer:
                url +="/admin"
            else:
                try:
                    is_registered = request.user.euser.registration_complete
                except:
                    is_registered = False
                
                if not is_registered:
                    url+="/register"

            return HttpResponseRedirect(url)
        return Response({"isLoggedIn":False,"detail":"User not logged in!"},status=status.HTTP_200_OK)