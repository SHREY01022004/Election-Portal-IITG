import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "election_portal22.settings")
app = Celery("election_portal22")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
