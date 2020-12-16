from django.contrib import admin
from .models import Profile, Club, Event, Comment


# Register your models here.
admin.site.register(Profile)
admin.site.register(Club)
admin.site.register(Event)
admin.site.register(Comment)
