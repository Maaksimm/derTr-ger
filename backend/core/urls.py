from rest_framework.routers import DefaultRouter

from .views import (
    CarApplicationViewSet,
    PackageApplicationViewSet,
    PassengerApplicationViewSet,
    PointViewSet,
    RewardSignupViewSet,
    TripViewSet,
)

router = DefaultRouter()
router.register('trips', TripViewSet, basename='trip')
router.register('points', PointViewSet, basename='point')
router.register('passenger-applications', PassengerApplicationViewSet, basename='passenger-application')
router.register('package-applications', PackageApplicationViewSet, basename='package-application')
router.register('car-applications', CarApplicationViewSet, basename='car-application')
router.register('reward-signups', RewardSignupViewSet, basename='reward-signup')

urlpatterns = router.urls
