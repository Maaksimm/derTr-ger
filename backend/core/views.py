from rest_framework import filters, mixins, viewsets

from .models import (
    CarApplication,
    PackageApplication,
    PassengerApplication,
    Point,
    RewardSignup,
    Trip,
)
from .serializers import (
    CarApplicationSerializer,
    PackageApplicationSerializer,
    PassengerApplicationSerializer,
    PointSerializer,
    RewardSignupSerializer,
    TripSerializer,
)


class TripViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only: trips are managed by staff (via /admin), the site only lists them."""

    queryset = Trip.objects.prefetch_related('stops').all()
    serializer_class = TripSerializer
    lookup_field = 'number'
    filter_backends = [filters.SearchFilter]
    search_fields = ['number', 'start_city', 'end_city']

    def get_queryset(self):
        qs = super().get_queryset()
        departure = self.request.query_params.get('departure_city')
        if departure:
            qs = qs.filter(departure_city=departure)
        return qs


class PointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Point.objects.all()
    serializer_class = PointSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'country', 'address']

    def get_queryset(self):
        qs = super().get_queryset()
        country = self.request.query_params.get('country')
        point_type = self.request.query_params.get('type')
        if country:
            qs = qs.filter(country=country)
        if point_type:
            qs = qs.filter(type=point_type)
        return qs


class PassengerApplicationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Create-only: mirrors the public "Заявка на поездку" form."""

    queryset = PassengerApplication.objects.all()
    serializer_class = PassengerApplicationSerializer


class PackageApplicationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Create-only: mirrors the public "Оформить посылку" form."""

    queryset = PackageApplication.objects.all()
    serializer_class = PackageApplicationSerializer


class CarApplicationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Create-only: mirrors the public car-transport order form."""

    queryset = CarApplication.objects.all()
    serializer_class = CarApplicationSerializer


class RewardSignupViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Create-only: mirrors the loyalty-program join form."""

    queryset = RewardSignup.objects.all()
    serializer_class = RewardSignupSerializer
