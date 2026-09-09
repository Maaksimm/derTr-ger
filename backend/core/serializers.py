from rest_framework import serializers

from .models import (
    CarApplication,
    PackageApplication,
    PassengerApplication,
    Point,
    RewardSignup,
    Stop,
    Trip,
)


class StopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city', 'time', 'is_key_stop', 'order']


class TripSerializer(serializers.ModelSerializer):
    stops = StopSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'number', 'status', 'route_variant', 'route_label',
            'car_name', 'car_color', 'drivers',
            'start_city', 'end_city', 'departure_city',
            'free_seats', 'applied_count', 'is_full', 'package_capacity_kg',
            'stops',
        ]


class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = [
            'id', 'type', 'title', 'country', 'address', 'maps_url',
            'description', 'address_delivery_available',
        ]


class PassengerApplicationSerializer(serializers.ModelSerializer):
    trip = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all(), required=False, allow_null=True)

    class Meta:
        model = PassengerApplication
        fields = [
            'id', 'trip', 'trip_label', 'city_from', 'address_from', 'city_to', 'address_to',
            'full_name', 'phones', 'email', 'promocode', 'note', 'status', 'created_at',
        ]
        read_only_fields = ['status', 'created_at']


class PackageApplicationSerializer(serializers.ModelSerializer):
    trip = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all(), required=False, allow_null=True)

    class Meta:
        model = PackageApplication
        fields = [
            'id', 'trip', 'trip_label', 'place', 'weight_kg', 'special_cargo',
            'sender_city', 'sender_address', 'sender_name', 'sender_phones', 'sender_email', 'sender_ttn',
            'recipient_city', 'recipient_address', 'recipient_name', 'recipient_phones',
            'promocode', 'note', 'status', 'created_at',
        ]
        read_only_fields = ['status', 'created_at']


class CarApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarApplication
        fields = [
            'id', 'city_from', 'city_to', 'brand', 'model', 'color', 'registration_number',
            'owner_name', 'owner_phones', 'note', 'status', 'created_at',
        ]
        read_only_fields = ['status', 'created_at']


class RewardSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardSignup
        fields = ['id', 'email', 'promocode', 'created_at']
        read_only_fields = ['created_at']
