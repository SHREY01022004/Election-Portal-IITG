from django.urls import path,include,re_path
from . import views
from django.views.generic import TemplateView, RedirectView

urlpatterns = [
   path("login_success/",views.LoginRedirectView.as_view(),name="login_redirect"),
   path("token/verify/",views.TokenVerifyView.as_view(),name="token_verify"),
   path('', include('dj_rest_auth.urls')),
   path("social/google/",view=views.GoogleLogin.as_view(),name="google_login"),
   path("social/outlook/",view=views.MicrosoftLogin.as_view(),name="outlook_login"),
   ###Override allauth views
   path('accounts/password/change/', RedirectView.as_view(url='/')),
   path("accounts/login",RedirectView.as_view(url="/")),
   path("accounts/signup",RedirectView.as_view(url="/")),
   path("accounts/inactive",RedirectView.as_view(url="/")),
   path('accounts/password/set/', RedirectView.as_view(url='/')),
   path('accounts/password/reset/', RedirectView.as_view(url='/')),
   path('accounts/password/reset/done/', RedirectView.as_view(url='/')),
   re_path('^accounts/password/reset/key/(?P<uidb36>[0-9A-Za-z]+)-(?P<key>.+)/$',
         RedirectView.as_view(url='/')),
   path('accounts/password/reset/key/done/', RedirectView.as_view(url='/')),
   path('accounts/email/', RedirectView.as_view(url='/')),
   path('accounts/confirm-email/', RedirectView.as_view(url='/')),
   re_path('^accounts/confirm-email/(?P<key>[-:\\w]+)/$',
         RedirectView.as_view(url='/')),
   path('accounts/', include('allauth.urls'), name='socialaccount_signup'),
]
