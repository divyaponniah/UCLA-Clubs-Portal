from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Club(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    socials = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Event(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255, null=True)
    date = models.DateTimeField()
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clubs = models.ManyToManyField(Club, related_name='students', blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

