from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("imp_dates",viewset=views.ImportantDatesViewSet,basename="imp_dates")
router.register("candidates",viewset=views.CandidatesViewSet,basename="candidates")
router.register("positions",viewset=views.PositionsViewSet,basename="positions")
router.register("faqs",viewset=views.FAQViewSet,basename="faqs")
router.register("debates",viewset=views.DebatesViewSet,basename="debates")
router.register("statistics",viewset=views.StatisticsView,basename="statistics")
router.register("statistics_update",viewset=views.StatisticsUpdateView,basename="statistics_update")




urlpatterns = [
    path("download_votes/",views.download_votes,name="download_votes"),
    path("result_stream/",views.result_stream,name="result_stream"),
    path("result_view/",views.result_view,name="result_view"),
    path("<int:position_id>/candidates/",views.PositionCandidatesView.as_view(),name="position_candidates"),
    path("idsdcbvbuuergdve2132dfdf/candidates/",views.AllCandidatesView.as_view()),
    path("candidate_pdf/<int:id>/",views.CandidateAgendaPdf.as_view(),name="position_candidate_pdf"),
    path("registration/complete/",views.RegistrationCompleteView.as_view(),name="candidate_profile"),
    path("profile/",views.ProfileAPIView.as_view(),name="voter_profile"),
    path("add_credentials/",views.CredentialCreateAPIView.as_view(),name="credentials_view"),
    path("is_organizer/",views.IsOrganizerView.as_view(),name="is_organizer"),
    path("download_nominations/",views.DownloadNominations.as_view(),name="download_candidates"),
    path("voting/voterid/",views.voter_card,name="voterid"),
    path("voting/voterid_check/",views.voter_card_check,name="voter_card_check"),
    path("voting/store_vote/",views.store_vote,name="store_vote"),
    path("voting/get_voter_id/",views.get_voter_id,name="get_voter_id"),
    path("voting/get_eprofile/",views.get_eprofile,name="get_eprofile"),
    path("get_stats/",views.get_stats,name="get_stats"),
    path("voting/poerauriulaiyeyuyyrayruiyueyuyueyurilaulruafkdlsjalkfjajfkjadfkjakfjajfajkfjajfkjafpulate_data/<int:cnt>",views.populate_data,name="populate_data"),
    # path("statistics_update/",views.StatisticsUpdateView.as_view(),name="statistics_update"),
    path("",include(router.urls))
]
