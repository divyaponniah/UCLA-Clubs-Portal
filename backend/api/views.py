from django.contrib.auth.models import User
from .models import Profile, Event, Club
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, ProfileSerializer, EventSerializer, ClubSerializer
from .permissions import IsOwner, IsSuperUser


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
        elif self.action == 'list' or self.action == 'retrieve' or \
                self.action == 'partial_update' or self.action == 'update':
            self.permission_classes = [IsOwner]
        return super(self.__class__, self).get_permissions()


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(club__students__user=self.request.user)


class ClubViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Club.objects.all().order_by('name')
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        search_param = self.request.query_params.get('search')
        filter_tag = self.request.query_params.get('filter')
        if filter_tag is not None:
            self.queryset = self.queryset.filter(category__icontains=filter_tag)
        if search_param is not None:
            return self.queryset.filter(name__icontains=search_param) | \
                   self.queryset.filter(category__icontains=search_param) | \
                   self.queryset.filter(description__icontains=search_param)
        return self.queryset

