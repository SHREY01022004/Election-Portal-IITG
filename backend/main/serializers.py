from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
import json

class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]


class VoterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter
        fields = ["user","is_voted"]
        depth = 1


class DebateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debate
        exclude = ["election"]


class ImportantdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imporatant_date
        fields = ["title", "date", "id"]


class EuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields = "__all__"
    
    def update(self, instance, validated_data):
        # blocking roll_number update 
        # Remove 'roll_number' from validated_data
        if 'roll_number' in validated_data:
            del validated_data['roll_number']

        return super().update(instance, validated_data)


class CandidateReadSerializer(serializers.ModelSerializer):
    
    def to_representation(self, instance):
        ret = super(CandidateReadSerializer, self).to_representation(instance)
        if ret["agenda_text"] is not None:
            ret["agenda_text"] = json.loads(ret["agenda_text"])
        return ret


    class Meta:
        model = Candidate
        fields = "__all__"
        depth = 1


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        exclude = ["election"]

class VoterCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoterCard

class PositionReadSerializer(serializers.ModelSerializer):
    candidates_p = CandidateReadSerializer(many=True)

    class Meta:
        model = Position
        fields = "__all__"
        depth = 1


class CandidateSerializer(serializers.ModelSerializer):
    # nomination_status = serializers.ReadOnlyField()
    def to_representation(self, instance):
        ret = super(CandidateSerializer, self).to_representation(instance)
        if ret["agenda_text"] is not None:
            ret["agenda_text"] = json.loads(ret["agenda_text"])
        return ret

    class Meta:
        model = Candidate
        exclude = ['election', "user", "agenda_pdf"]


class CandidateOrganizerSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super(CandidateOrganizerSerializer, self).to_representation(instance)
        if ret["agenda_text"] is not None:
            ret["agenda_text"] = json.loads(ret["agenda_text"])
        return ret

    class Meta:
        model = Candidate
        exclude = ['election', "user"]


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        exclude = ["election"]

class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        exclude = ["election"]


class CandidateBriefSerializer(serializers.ModelSerializer):
    branch = serializers.CharField(source="user.get_branch_display")
    degree = serializers.CharField(source="user.get_degree_display")
    position = serializers.CharField(source="position.title")
    name = serializers.CharField(source="user.name")
    roll_number = serializers.CharField(source="user.roll_number")

    def to_representation(self, instance):
        ret = super(CandidateBriefSerializer, self).to_representation(instance)
        if ret["agenda_text"] is not None:
            ret["agenda_text"] = json.loads(ret["agenda_text"])
        return ret

    class Meta:
        model = Candidate
        fields = ["id", "video", "image", "about", "agenda_text", "position", "branch",
                  "name", "nomination_status", "tagline", "semester", "degree", "roll_number"]


class CandidateDetailSerializer(serializers.ModelSerializer):
    position = serializers.CharField(source="position.title")
    name = serializers.CharField(source="user.name")
    branch = serializers.CharField(source="user.get_branch_display")

    def to_representation(self, instance):
        ret = super(CandidateDetailSerializer, self).to_representation(instance)
        if ret["agenda_text"] is not None:
            ret["agenda_text"] = json.loads(ret["agenda_text"])
        return ret

    class Meta:
        model = Candidate
        fields = ["about", "id", "video", "tagline", "name",
                  "position", "branch", "agenda_text", "image"]
        
class ALLCandidateDetailSerializer(serializers.ModelSerializer):
    position = serializers.CharField(source="position.title")
    name = serializers.CharField(source="user.name")
    branch = serializers.CharField(source="user.get_branch_display")
    roll = serializers.CharField(source="user.roll_number")
    hostel = serializers.CharField(source="user.hostel")
    email = serializers.CharField(source="user.email")

    class Meta:
        model = Candidate
        fields = ["roll", "name", "hostel", "email", "cpi",
                  "position", "branch", "contact_no", "proposed_by", "seconded_by"]
