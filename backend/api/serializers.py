from django.contrib.auth.models import User
from .models import Profile, Club, Event, Comment
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'pk', 'username', 'email']


class EventSerializer(serializers.HyperlinkedModelSerializer):
    club = serializers.StringRelatedField(many=False)

    class Meta:
        model = Event
        fields = ['url', 'pk', 'club', 'name', 'date', 'description']


class ClubSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = ['url', 'pk', 'name', 'category', 'description', 'socials', 'contact', 'events']

    def get_events(self, instance):
        event_set = instance.events.all().order_by('date')
        return EventSerializer(event_set, many=True, context=self.context).data


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    clubs = serializers.SerializerMethodField()
    club_ids = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Club.objects.all(), source='clubs')

    class Meta:
        model = Profile
        fields = ['url', 'pk', 'user', 'clubs', 'club_ids']

    def get_clubs(self, instance):
        club_set = instance.clubs.all().order_by('name')
        return ClubSerializer(club_set, many=True, read_only=True, context=self.context).data


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    profile = serializers.SerializerMethodField()
    profile_id = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=Profile.objects.all(), source='profile')

    club = serializers.SerializerMethodField()
    club_id = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=Club.objects.all(), source='club')

    class Meta:
        model = Comment
        fields = ['url', 'pk', 'profile', 'profile_id', 'club', 'club_id', 'title', 'description', 'date']

    def get_profile(self, instance):
        return ProfileSerializer(instance.profile, many=False, read_only=False, context=self.context).data

    def get_club(self, instance):
        return ClubSerializer(instance.club, many=False, read_only=False, context=self.context).data






