from django.contrib.auth.models import User
from .models import Profile, Club, Event
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
    # events = EventSerializer(many=True)
    # events = serializers.HyperlinkedRelatedField(many=True, view_name='event-detail')

    class Meta:
        model = Club
        fields = ['url', 'pk', 'name', 'category', 'description', 'socials', 'contact', 'events']

    def get_events(self, instance):
        event_set = instance.events.all().order_by('date')
        return EventSerializer(event_set, many=True, context=self.context).data


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    clubs = ClubSerializer(many=True, read_only=True)
    club_ids = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Club.objects.all(), source='clubs')

    class Meta:
        model = Profile
        fields = ['url', 'pk', 'user', 'clubs', 'club_ids']






