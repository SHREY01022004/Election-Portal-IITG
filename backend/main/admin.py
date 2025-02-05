from django.contrib import admin
from .models import *

@admin.register(EUser)
class EuserAdnmin(admin.ModelAdmin):
    list_display = ['id','email','name']
    search_fields=list_display
    
@admin.register(EligibleVoters)
class EligibleVotersAdmin(admin.ModelAdmin):
    list_display=['roll_no','sname','iitg_webmail','email_id']
    search_fields=list_display

@admin.register(Voter)
class VoterAdmin(admin.ModelAdmin):
    list_display = ['id','user','is_voted']
    search_fields=["user__email","user__name","is_voted"]
    list_filter = ('is_voted',)

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ['id','name','name_slug']

@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ['id','title']

@admin.register(Candidate)
class CandidateAdnmin(admin.ModelAdmin):
    list_display = ["id","__str__","position"]
    search_fields=["user__name","user__email","position__title"]
    list_filter=["position__title"]

admin.site.register(Credentials)

@admin.register(Debate)
class DebateAdmin(admin.ModelAdmin):
    list_display = ["id","title","debate_time"]
    search_fields=["title"]
    list_filter=["debate_time"]

@admin.register(Faq)
class FAQsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Faq._meta.get_fields()]

@admin.register(Imporatant_date)
class Imporatant_dateAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Imporatant_date._meta.get_fields()]

@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Statistic._meta.get_fields()]


@admin.register(VoterCard)
class StatisticAdmin(admin.ModelAdmin):
    search_fields = ['uniqueid',"voter__user__email"]
    list_display = ['uniqueid']


from django.contrib.admin import AdminSite

class OrganizerAdminSite(AdminSite):
    site_header="Organizers Admin Site"
    site_title = 'Organizers Admin'
    index_title = "Welcome to Elections Admin"


organizer_admin_site = OrganizerAdminSite(name="organizer_admin")
organizer_admin_site.register(Position)
organizer_admin_site.register(Candidate,CandidateAdnmin)
organizer_admin_site.register(Voter,VoterAdmin)
organizer_admin_site.register(Debate,DebateAdmin)
organizer_admin_site.register(Faq,FAQsAdmin)
organizer_admin_site.register(EUser,EuserAdnmin)
organizer_admin_site.register(Election)
# organizer_admin_site.register(VoterCard)
organizer_admin_site.register(Statistic)

