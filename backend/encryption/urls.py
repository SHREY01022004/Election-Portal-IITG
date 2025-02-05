
from django.urls import path
from . import views

###############################################
   ENCRYPTION FLOW HAS BEEN MOVE TO NODEJS SERVICE AS A VALIDATING SERVICE
################################
urlpatterns = [
   path("retrieve_ne_pair/",views.RetrieveNEpairAPIView.as_view(),name="sign_api"),
   path("sign_vote/",views.SignAPIView.as_view(),name="sign_api"),
   path("verify_signed_vote/",views.VerifySignatureAPIView.as_view(),name="verify_signature_api"),
   path("decrypt_vote/",views.DecryptAPIView.as_view(),name="decrypt_api")
]
