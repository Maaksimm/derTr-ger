from django.contrib import admin

from .models import (
    CarApplication,
    PackageApplication,
    PassengerApplication,
    Point,
    RewardSignup,
    Stop,
    Trip,
)


class StopInline(admin.TabularInline):
    model = Stop
    extra = 1


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['number', 'status', 'departure_city', 'start_city', 'end_city', 'free_seats', 'is_full']
    list_filter = ['status', 'departure_city', 'is_full']
    search_fields = ['number', 'start_city', 'end_city']
    inlines = [StopInline]


@admin.register(Point)
class PointAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'country', 'address_delivery_available']
    list_filter = ['type', 'country', 'address_delivery_available']
    search_fields = ['title', 'country', 'address']


@admin.register(PassengerApplication)
class PassengerApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'city_from', 'city_to', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['full_name', 'city_from', 'city_to']


@admin.register(PackageApplication)
class PackageApplicationAdmin(admin.ModelAdmin):
    list_display = ['sender_name', 'recipient_name', 'weight_kg', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['sender_name', 'recipient_name']


@admin.register(CarApplication)
class CarApplicationAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'registration_number', 'owner_name', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['brand', 'model', 'registration_number', 'owner_name']


@admin.register(RewardSignup)
class RewardSignupAdmin(admin.ModelAdmin):
    list_display = ['email', 'promocode', 'created_at']
    search_fields = ['email']
