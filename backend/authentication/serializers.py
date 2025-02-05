from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from django.contrib.auth import get_user_model

UserModel = get_user_model()

class CustomUserDetailSerializer(UserDetailsSerializer):
    registration_complete = serializers.BooleanField(source="euser.registration_complete")
    class Meta:
        extra_fields = ["registration_complete"]
        if hasattr(UserModel, 'USERNAME_FIELD'):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, 'EMAIL_FIELD'):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(UserModel, 'last_name'):
            extra_fields.append('last_name')
        model = UserModel
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)