from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.conf import settings
from celery import shared_task

@shared_task()
def send_email_task(remail,subject,message):
    try:
        email = EmailMessage(
            subject = subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[remail],
        )
        print("Checkpoint 2")
        email.content_subtype = 'html'
        email.send(fail_silently=False)
        # return HttpResponseRedirect(reverse('apply:success'))
    except Exception as e:
        print('mail not sent',e)