from django.db import models


class Trip(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Завершён'),
        ('planned', 'Запланирован'),
    ]

    number = models.CharField(max_length=20, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')
    route_variant = models.CharField(max_length=40, blank=True)
    route_label = models.CharField(max_length=255, blank=True)

    car_name = models.CharField(max_length=120, blank=True)
    car_color = models.CharField(max_length=60, blank=True)
    drivers = models.JSONField(default=list, blank=True, help_text='List of driver names')

    start_city = models.CharField(max_length=120)
    end_city = models.CharField(max_length=120)
    departure_city = models.CharField(
        max_length=20, choices=[('odesa', 'Одесса'), ('kyiv', 'Киев')], default='odesa'
    )

    free_seats = models.PositiveSmallIntegerField(null=True, blank=True)
    applied_count = models.PositiveSmallIntegerField(default=0)
    is_full = models.BooleanField(default=False)
    package_capacity_kg = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['number']

    def __str__(self):
        return f'#{self.number} {self.start_city} -> {self.end_city}'


class Stop(models.Model):
    trip = models.ForeignKey(Trip, related_name='stops', on_delete=models.CASCADE)
    city = models.CharField(max_length=120)
    time = models.CharField(max_length=60, help_text='Display string, e.g. "Чт 27.08 10:40"')
    is_key_stop = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.trip.number}: {self.city} ({self.time})'


class Point(models.Model):
    TYPE_CHOICES = [
        ('Остановка', 'Остановка'),
        ('Склад', 'Склад'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='Остановка')
    title = models.CharField(max_length=120)
    country = models.CharField(max_length=80)
    address = models.CharField(max_length=255)
    maps_url = models.URLField()
    description = models.CharField(max_length=255, blank=True)
    address_delivery_available = models.BooleanField(default=False)

    class Meta:
        ordering = ['country', 'title']

    def __str__(self):
        return f'{self.title} ({self.country})'


class PassengerApplication(models.Model):
    """Mirrors the "Заявка на поездку" form (node/add/passenger)."""

    trip = models.ForeignKey(
        Trip, related_name='passenger_applications', on_delete=models.SET_NULL, null=True, blank=True
    )
    trip_label = models.CharField(max_length=255, blank=True, help_text='Free-text fallback if trip FK is unset')

    city_from = models.CharField(max_length=120)
    address_from = models.CharField(max_length=255, blank=True)
    city_to = models.CharField(max_length=120)
    address_to = models.CharField(max_length=255, blank=True)

    full_name = models.CharField(max_length=120)
    phones = models.JSONField(default=list)
    email = models.EmailField(blank=True)
    promocode = models.CharField(max_length=40, blank=True)
    note = models.TextField(blank=True)

    status = models.CharField(max_length=20, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.full_name} - {self.city_from} -> {self.city_to}'


class PackageApplication(models.Model):
    """Mirrors the "Оформить посылку" form (node/add/package)."""

    trip = models.ForeignKey(
        Trip, related_name='package_applications', on_delete=models.SET_NULL, null=True, blank=True
    )
    trip_label = models.CharField(max_length=255, blank=True)

    place = models.PositiveSmallIntegerField(default=1)
    weight_kg = models.DecimalField(max_digits=6, decimal_places=1)
    special_cargo = models.JSONField(default=list, blank=True, help_text='List of special-cargo codes')

    sender_city = models.CharField(max_length=120)
    sender_address = models.CharField(max_length=255, blank=True)
    sender_name = models.CharField(max_length=120)
    sender_phones = models.JSONField(default=list)
    sender_email = models.EmailField(blank=True)
    sender_ttn = models.CharField(max_length=60, blank=True)

    recipient_city = models.CharField(max_length=120)
    recipient_address = models.CharField(max_length=255, blank=True)
    recipient_name = models.CharField(max_length=120)
    recipient_phones = models.JSONField(default=list)

    promocode = models.CharField(max_length=40, blank=True)
    note = models.TextField(blank=True)

    status = models.CharField(max_length=20, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender_name} -> {self.recipient_name}'


class CarApplication(models.Model):
    """Mirrors the "Перевозка машин" order form (node/add/car)."""

    city_from = models.CharField(max_length=120)
    city_to = models.CharField(max_length=120)

    brand = models.CharField(max_length=80)
    model = models.CharField(max_length=80)
    color = models.CharField(max_length=60)
    registration_number = models.CharField(max_length=40)

    owner_name = models.CharField(max_length=120)
    owner_phones = models.JSONField(default=list)
    note = models.TextField(blank=True)

    status = models.CharField(max_length=20, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.brand} {self.model} ({self.registration_number})'


class RewardSignup(models.Model):
    """Mirrors the "Программа лояльности" join form (node/add/reward)."""

    email = models.EmailField()
    promocode = models.CharField(max_length=40, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
