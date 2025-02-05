
from django.shortcuts import get_object_or_404
from .models  import Election

def get_election(name_slug):
        return get_object_or_404(Election,name_slug=name_slug)

class ElectionMixin:
    def dispatch(self,request,*args,**kwargs):
        self.election = get_election(kwargs.get("name_slug",None))
        return super(ElectionMixin,self).dispatch(request,*args,**kwargs)