from django.contrib.auth.models import User
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin): 
        user = sociallogin.user
        if user.id:
            return
        if not user.email:
            return

        try:
            print("Connecting to user account")
            user = User.objects.get(email__iexact=user.email)  # if user exists, connect the account to the existing account and login
            sociallogin.connect(request, user)
        except User.DoesNotExist:
            print("Not found")
