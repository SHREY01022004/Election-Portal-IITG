from rest_framework import permissions
from .models import Voter,Candidate, Imporatant_date
from django.utils import timezone


class ElectionOrganizerWritePermission(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_permission(self, request, view):
        if view.action in ["list","retrieve"]:
            return True
        try:
            # is_organizer = Voter.objects.filter(election_organizers__id=view.election.id,user__id=request.user.euser.id).exists()
            is_organizer = request.user.is_staff
            return is_organizer
        except Exception as err:
            print(repr(err))
            return False


class IsOrganizerOrCandidateWriteOnly(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_object_permission(self, request, view,obj):
        if view.action in ["list","retrieve","create"]:
            return True
        
        user = request.user
        election=view.election
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))
            
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            return candidates.filter(pk=obj.id).exists()
        except Exception as err:
            print(repr(err))
            return False


class OnlyOrganizerOrCandidate(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed or candidate only by one of the organizers of the election.'
    def has_permission(self,request,view):
        if view.action=="create":
            return True

        user = request.user
        election=view.election

        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))

        if view.action == "list":
            return is_organizer
        return True

    def has_object_permission(self, request, view,obj):
        user = request.user
        election=view.election

        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))
        
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            is_candidate=candidates.filter(pk=obj.id).exists()
        except Exception as err:
            print(repr(err))
            is_candidate=False
        
        return is_organizer or is_candidate
        

class CandidateDeadlinePermissions(permissions.BasePermission):
    message = "Invalid Access deadline to update specified details is now over"

    def has_permission(self,request,view):
        user = request.user
        election=view.election

        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))
        
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            is_candidate=candidates.exists()
        except Exception as err:
            print(repr(err))
            is_candidate=False
        
        if is_candidate:
            curr_time = timezone.localtime(timezone.now())
            print(curr_time, Imporatant_date.objects.filter(title='Basic Info Deadline')[0].date)
            if curr_time<=Imporatant_date.objects.filter(title='Basic Info Deadline')[0].date:
                return True

            if curr_time>Imporatant_date.objects.filter(title='Nomination Deadline')[0].date:
                return False
            basic_info_list = ["roll_number","email","semester","contact_no","about","image","degree","branch","hostel","cpi","backlogs","active_backlogs","room_no"]


            for k in basic_info_list:
                if k in request.data:
                    
                    return False
        
        return True

    def has_object_permission(self,request,view,obj):
        user = request.user
        election=view.election
       
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))

        
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            candidate = candidates.filter(pk=obj.id).first()
            is_candidate = candidates.filter(pk=obj.id).exists()
        except Exception as err:
            print(err)
            return False
        
        print(is_candidate)
        if is_candidate:
            curr_time = timezone.now().timestamp()*1000
            
            if curr_time<=Imporatant_date.objects.filter(title='Basic Info Deadline')[0].date:
                return True

            if curr_time>Imporatant_date.objects.filter(title='Nomination Deadline')[0].date:
                return False
            basic_info_list = ["roll_number","email","semester","contact_no","about","image","degree","branch","hostel","cpi","backlogs","active_backlogs","room_no"]


            for k in basic_info_list:
                if k in request.data:
                    return False
        
        if is_candidate:
            return candidate.user.roll_number and candidate.user.email and candidate.contact_no and candidate.user.degree and candidate.cpi and candidate.backlogs and candidate.active_backlogs and candidate.semester
        
        return False
        
        
        


class OnlyOrganizerUpdate(permissions.BasePermission):
    message = "Invalid Access deadline to update specified details is now over"

    def has_permission(self,request,view):
        print(view.action)
        if view.action=="create":
            return False
        
        if view.action in ["update","destroy","partial_update"]:
            try:
                is_organizer = request.user.is_staff
                return is_organizer
            except Exception as err:
                return False
        
        return True


class OnlyOrganizerOrCandidateUpdate(permissions.BasePermission):
    message = "Access denied"

    def has_permission(self,request,view):
        if view.action=="create":
            return False
        

        return True
    
    def has_object_permission(self,request,view,obj):
        if view.action in ["update","destroy"]:
            user = request.user
            election = view.election

            try:
                is_organizer = request.user.is_staff
            except Exception as err:
                is_organizer = False
            
            try:
                euser = user.euser
                candidates = Candidate.objects.filter(election=election,user=euser)
                is_candidate = candidates.filter(pk=obj.id).exists()
            except Exception as err:
                is_candidate = False
            
            return is_organizer or is_candidate
        
        return True
        

