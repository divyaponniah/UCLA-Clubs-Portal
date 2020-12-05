from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Profile, Event, Club
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, ProfileSerializer, EventSerializer, ClubSerializer
from .permissions import IsOwner, IsSuperUser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return self.queryset
        elif self.request.user.is_authenticated:
            return self.queryset.filter(user=self.request.user)

    def get_permissions(self):
        if self.action == 'create' or self.action == 'destroy':
            self.permission_classes = [IsSuperUser, ]
        elif self.action == 'list' or self.action == 'retrieve' or self.action == 'partial_update' or self.action == 'update':
            self.permission_classes = [IsOwner]
        return super(self.__class__, self).get_permissions()


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]


class ClubViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticated]

