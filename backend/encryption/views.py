from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import renderers,permissions,status
from .utils import *
from rest_framework.response import Response

# Create your views here.
class RetrieveNEpairAPIView(GenericAPIView):
    # renderer_classes = (renderers.JSONRenderer,)
    permission_classes = (permissions.AllowAny,) # TODO change permission classes to authencticted only
    authentication_classes = []

    def get(self,request,*args,**kwargs):
        ne_pair = get_ne_pair()
        return Response(ne_pair,status=status.HTTP_200_OK)

class SignAPIView(GenericAPIView):
    # renderer_classes = (renderers.JSONRenderer,)
    permission_classes = (permissions.AllowAny,) # TODO change permission classes to authencticted only
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        data = request.data.get("blinded_vote",None)
        print(data)
        if not data :
            return Response({"detail":"Invalid data type"},status=status.HTTP_400_BAD_REQUEST)
        signed_data = sign(data)
        return Response({
            "signed_data":signed_data
        },status=status.HTTP_200_OK)


class VerifySignatureAPIView(GenericAPIView):
    # renderer_classes = (renderers.JSONRenderer,)
    permission_classes = (permissions.AllowAny,) 
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        data = request.data.get("blinded_vote",None)
        signature = request.data.get("signature",None)

        if not data or not signature :
            return Response({"detail":"Invalid data type"},status=status.HTTP_400_BAD_REQUEST)

        is_verified = verify(data,signature)
        return Response({
            "is_verified":is_verified
        },status=status.HTTP_200_OK)


# Note: Test api view to check the decrypt functionality,in election the votes
# will be counted at the end of the election time
class DecryptAPIView(GenericAPIView):
    # renderer_classes = (renderers.JSONRenderer,)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        encrypted_data = request.data.get("encrypted_data",None)
        if encrypted_data :
            return Response({"detail":"Invalid data type"},status=status.HTTP_400_BAD_REQUEST)

        decrypted_data = decrypt(encrypted_data)
        return Response({
            "decrypted_data":decrypted_data
        },status=status.HTTP_200_OK)