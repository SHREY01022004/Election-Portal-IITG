from pyexpat import model
from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from PIL import Image
from datetime import datetime
from django.core.exceptions import ValidationError


STATUS_CHOICES = (
    ('pending','To be started'),
    ('ongoing','Ongoing'),
    ('completed','Completed')
)    

NOMINATION_STATUS = (
    ('approved','Approved'),
    ('pending','Pending'),
    ('rejected','Rejected')
)

TYPE = (
    ('P','Proposed by'),
    ('S','Seconded by')
)

GENDER = (
    ('Male','Male'),
    ('Female','Female')
)

BRANCH = (
    ('01', 'CSE'),
    ('02', 'ECE'),
    ('03', 'ME'),
    ('04', 'Civil'),
    ('05', 'Design'),
    ('06', 'BSBE'),
    ('07', 'CL'),
    ('08', 'EEE'),
    ('21', 'Physics'),
    ('22', 'Chemistry'),
    ('23', 'MNC'),
    ('41', 'HSS'),
    ('50','DSAI'),
    ('51', 'Energy'),
    ('52', 'Environment'),
    ('53', 'Nano-Tech'),
    ('54', 'Rural-Tech'),
    ('55', 'Linguistics'),
	('61', 'Others'),
)

DEGREE = (
    ('B','B.Tech'),
    ('M','M.Tech'),
    ('P',"PhD"),
    ("Msc","MSc"),
    ("Mdes","Mdes"),
    ("Bdes","Bdes"),
    ("Dual","Dual Degree"),
    ("MA","MA"),
    ("MSR","MSR"),
    ("MBA","MBA"),
    ("Others","Others")
)

HOSTELS = [
    ('lohit', 'Lohit'),
    ('brahmaputra', 'Brahmaputra'),
    ('siang', 'Siang'),
    ('manas', 'Manas'),
    ('dibang', 'Dibang'),
    ('disang', 'Disang'),
    ('kameng', 'Kameng'),
    ('umiam', 'Umiam'),
    ('barak', 'Barak'),
    ('kapili', 'Kapili'),
    ('dihing', 'Dihing'),
    ('gaurang', 'Gaurang'),
    ('subansiri', 'Subansiri'),
    ('dhansiri', 'Dhansiri'),
    ('dibang', 'Dibang'),
    ('msh', 'Married Scholar Hostel'),
    ('not-alloted', 'Not Alloted'),
]

class EUser(models.Model):
    name = models.CharField(max_length=100,blank=True,null=True)
    is_eligibleVoter = models.BooleanField(default=False)
    roll_number = models.CharField(max_length=100,blank=True,null=True)
    degree = models.CharField(choices=DEGREE,max_length=70,blank=True,null=True)
    hostel = models.CharField(choices=HOSTELS,max_length=50,blank=True,null=True)
    branch = models.CharField(choices=BRANCH,max_length=50,blank=True,null=True)
    gender = models.CharField(choices=GENDER,max_length=50,blank=True,null=True)
    email = models.EmailField(unique=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='euser')
    registration_complete = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.email) + '_' + str(self.id)

class EligibleVoters(models.Model):
        sname = models.CharField(max_length=100,blank=True,null=True)
        roll_no=models.CharField(max_length=100,blank=True,null=True)
        iitg_webmail=models.EmailField(unique=True)
        email_id=models.EmailField(unique=True)
        
        def __str__(self)->str:
            return str(self.iitg_webmail)

class Election(models.Model):
    name = models.CharField(max_length=250)
    name_slug = models.SlugField(max_length=100,unique=True)
    organization = models.CharField(max_length=250)
    description = models.TextField()
    website_link = models.URLField()
    rules = models.JSONField()
    date_created = models.DateField(default=datetime.now)
    status = models.CharField(choices=STATUS_CHOICES,max_length=50)
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField() #should be greater than start date

    def __str__(self) -> str:
        return self.name

    def __new__(self, *args, **kwargs):
        ret =  models.Model.__new__(self)
        # book = Imporatant_date(title="Pride and Prejudice", date=datetime.now(), election=self.)
        # book.save()
        return ret

    def save(self, *args, **kwargs):
        super(Election, self).save(*args, **kwargs)
        if not Imporatant_date.objects.filter(title='Nomination Deadline').exists():
            imp_date1 = Imporatant_date(title="Nomination Deadline", date=datetime.now(), election=self)
            imp_date1.save()
        if not Imporatant_date.objects.filter(title='Basic Info Deadline').exists():
            imp_date2 = Imporatant_date(title="Basic Info Deadline", date=datetime.now(), election=self)
            imp_date2.save()


class Voter(models.Model):
    user = models.ForeignKey(EUser,null=True,on_delete=models.SET_NULL,related_name='voter_ids')
    is_voted = models.BooleanField(default=False)
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='voters')
    election_organizers = models.ForeignKey(Election,blank=True,null=True,on_delete=models.DO_NOTHING,related_name='organizers') # change the name of field to election
    election_creator = models.OneToOneField(Election,blank=True,null=True,on_delete=models.DO_NOTHING,related_name='created_by')

    class Meta:
        unique_together = (('user', 'election'), ('user', 'election_organizers'))

    def __str__(self) -> str:
        if self.election_organizers:
            return 'ORG_' + str(self.user)
        return str(self.user)

class Position(models.Model):
    title = models.CharField(max_length=250,unique=True)
    debate_date_time = models.DateTimeField()
    max_votes = models.PositiveIntegerField() 
    voting_instructions = models.JSONField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='positions')
    

    def __str__(self) -> str:
        return self.title

def get_default_witness():
    return {
        "name":"",
        "cpi":"",
        "roll_number":"",
        "branch": "",
        "degree":"",
        "department": "",
        "email":"",
        "hostel":"",
        "room_no":"",
        "semester":"",
        "contact_no":""
    }

class Candidate(models.Model):
    position = models.ForeignKey(Position,on_delete=models.DO_NOTHING,related_name='candidates_p')
    agenda_text = models.TextField(null=True,blank=True)
    top_4_agenda_text = models.JSONField(null=True,blank=True)
    image = models.ImageField(upload_to="candidate_profile/",blank=True,null=True)
    video = models.URLField(null=True,blank=True)
    about = models.TextField(null=True,blank=True)
    tagline = models.CharField(max_length=500,null=True,blank=True)
    agenda_pdf = models.FileField(upload_to="agenda/",blank=True)
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='candidates_e')
    user = models.ForeignKey(EUser,on_delete=models.DO_NOTHING,related_name='candidates_ids')
    nomination_status = models.CharField(choices=NOMINATION_STATUS,max_length=70,default="pending")
    cpi = models.CharField(max_length=70,null=True,blank=True)
    backlogs = models.CharField(max_length=100,null=True,blank=True)
    active_backlogs = models.CharField(max_length=100,null=True,blank=True)
    sign = models.FileField(blank=True,null=True)
    date = models.DateField(null=True,blank=True)
    semester = models.CharField(max_length=70,null=True,blank=True)
    contact_no = models.CharField(max_length=10,null=True,blank=True)
    room_no = models.CharField(max_length=70,null=True,blank=True)
    proposed_by = models.JSONField(null=True,blank=True,default=get_default_witness)
    seconded_by = models.JSONField(null=True,blank=True,default=get_default_witness)
    credentials = models.JSONField(null=True,blank=True,default=dict)
    verified_credentials = models.JSONField(null=True,blank=True,default=dict)
    proposed_by_sign = models.ImageField(upload_to="witness_signs/",null=True,blank=True)
    seconded_by_sign = models.ImageField(upload_to="witness_signs/",null=True,blank=True)
    nomination_complete = models.BooleanField(default=False)

    

    class Meta:
        unique_together = (('position', 'election', 'user'))
    
    def __str__(self) -> str:
        return str(self.position) + '_' + str(self.user)

    # def save(self, *args, **kwargs):
    #     super().save()  # saving image first

    #     img = Image.open(self.image.path) # Open image using self
    #     if img.height > 100 or img.width > 100:
    #         new_img = (100, 100)
    #         img.thumbnail(new_img)
    #         img.save(self.image.path)  # saving image at the same path

class Faq(models.Model):
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='faqs')
    question = models.TextField()
    answer = models.TextField()

    def __str__(self) -> str:
        return self.id

class Imporatant_date(models.Model):
    title = models.CharField(max_length=250)
    date = models.DateTimeField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='important_dates')

    def __str__(self) -> str:
        return self.title
    
    def delete(self, *args, **kwargs):
        if self.title not in ["Nomination Deadline", "Basic Info Deadline"]:
            super(Imporatant_date, self).delete(*args, **kwargs)
        else:
            raise ValidationError('This Deadline cannot be deleted')


class Statistic(models.Model):
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='statistics')
    stat_cnt = models.JSONField(blank=True,null=True)
    stat_total = models.JSONField(blank=True,null=True)
    stat_title = models.CharField(max_length=250)

    def __str__(self) -> str:
        return self.stat_title

    class Meta:
        unique_together = (('election', 'stat_title'))

class Debate(models.Model):
    title = models.CharField(max_length=250)
    debate_time = models.DateTimeField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='debates')

    def __str__(self) -> str:
        return self.title

class Credentials(models.Model):
    name = models.TextField(null=True,blank=True)
    file = models.FileField(upload_to="credentials/")

    def __str__(self) -> str:
        return self.name

import random
import string
def create_id():
    our_choices = string.ascii_lowercase + string.digits + "!@#$%^&*"
    id = ''.join(random.choices(our_choices, k=8))
    print(our_choices)
    try:
        obj = VoterCard.objects.filter(uniqueid = id)
        if not obj:
            print(id)
            return id
        return create_id()
    except Exception as e:
        print(e)

def create_id_email():
    our_choices = string.digits
    id = ''.join(random.choices(our_choices, k=6))
    print(our_choices)
    try:
        obj = VoterCard.objects.filter(uniqueid_email = id)
        if not obj:
            print(id)
            return id
        return create_id()
    except Exception as e:
        print(e)

class VoterCard(models.Model):
    voter = models.OneToOneField(Voter,on_delete=models.CASCADE,related_name='voter',blank=True,null=True)
    uniqueid = models.CharField(max_length=10,default = create_id)
    uniqueid_email = models.CharField(max_length=10,default = create_id_email)
    vote = models.TextField(blank=True,null=True,editable=False)

    def __str__(self) -> str:
        return str(self.voter)

class VoterCardOld(models.Model):
    voter = models.EmailField(null=True,blank=True)
    uniqueid = models.CharField(max_length=10,default = create_id)
    uniqueid_email = models.CharField(max_length=10,default = create_id_email)
    vote = models.TextField(blank=True,null=True,editable=False)

    def __str__(self) -> str:
        return str(self.voter)

class VoterOld(models.Model):
    user = models.ForeignKey(EUser,null=True,on_delete=models.SET_NULL,related_name='voter_ids_old')
    is_voted = models.BooleanField(default=False)
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='voters_old')
    election_organizers = models.ForeignKey(Election,blank=True,null=True,on_delete=models.DO_NOTHING,related_name='organizers_old') # change the name of field to election
    election_creator = models.OneToOneField(Election,blank=True,null=True,on_delete=models.DO_NOTHING,related_name='created_by_old')

    class Meta:
        unique_together = (('user', 'election'), ('user', 'election_organizers'))


@receiver(post_save,sender=User)
def create_euser(sender,instance,created,*args,**kwargs):
    if created:
        # euser = EUser.objects.filter(instance.email)
        euser = EUser.objects.create(
            user=instance,
            email=instance.email,
            name=instance.first_name,
            roll_number=instance.email)
