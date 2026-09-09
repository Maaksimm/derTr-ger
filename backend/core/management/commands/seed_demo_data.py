from django.core.management.base import BaseCommand

from core.models import Point, Stop, Trip


TRIPS = [
    {
        'number': '20613', 'status': 'completed', 'route_variant': 'west-ukraine',
        'route_label': 'Из Одессы в Швейцарию через запад Украины',
        'car_name': 'Mercedes-Benz Sprinter Lang', 'car_color': 'Серый',
        'drivers': ['Игорь П.', 'Сергей М.'],
        'start_city': 'Сьон', 'end_city': 'Одесса', 'departure_city': 'odesa',
        'free_seats': 0, 'applied_count': 8, 'is_full': True, 'package_capacity_kg': 0,
        'stops': [
            ('Сьон', 'Чт 27.08 10:00', False), ('Мартиньи', 'Чт 27.08 10:40', False),
            ('Лозанна', 'Чт 27.08 13:10', False), ('Женева', 'Чт 27.08 14:00', True),
            ('Цюрих', 'Сб 29.08 06:00', False), ('Санкт Галлен', 'Сб 29.08 07:00', False),
            ('Мемминген', 'Сб 29.08 08:20', False), ('Вена', 'Сб 29.08 14:20', False),
            ('Одесса', 'Вс 30.08 16:00', False),
        ],
    },
    {
        'number': '20612', 'status': 'planned', 'route_variant': 'romania',
        'route_label': 'Из Одессы в Швейцарию через Румынию',
        'car_name': 'Mercedes-Benz Sprinter Lang', 'car_color': 'Синий',
        'drivers': ['Владимир С.', 'Вячеслав В.'],
        'start_city': 'Одесса', 'end_city': 'Женева', 'departure_city': 'odesa',
        'free_seats': None, 'applied_count': 8, 'is_full': True, 'package_capacity_kg': 60,
        'stops': [
            ('Одесса', 'Вт 01.09 06:00', False), ('Вена', 'Ср 02.09 06:10', False),
            ('Мюнхен', 'Ср 02.09 11:30', False), ('Цюрих', 'Ср 02.09 15:30', False),
            ('Берн', 'Ср 02.09 18:30', False), ('Лозанна', 'Ср 02.09 20:00', False),
            ('Сьон', 'Ср 02.09 23:20', True), ('Женева', 'Чт 03.09 13:50', False),
        ],
    },
    {
        'number': '20614', 'status': 'planned', 'route_variant': 'west-ukraine',
        'route_label': 'Из Одессы в Швейцарию через запад Украины',
        'car_name': 'Mercedes-Benz Sprinter Lang', 'car_color': 'Синий',
        'drivers': ['Владимир С.', 'Вячеслав В.'],
        'start_city': 'Сьон', 'end_city': 'Одесса', 'departure_city': 'odesa',
        'free_seats': 7, 'applied_count': 5, 'is_full': False, 'package_capacity_kg': 492,
        'stops': [
            ('Сьон', 'Чт 03.09 10:00', False), ('Мартиньи', 'Чт 03.09 10:40', False),
            ('Женева', 'Чт 03.09 19:20', True), ('Берн', 'Сб 05.09 09:40', False),
            ('Цюрих', 'Сб 05.09 11:20', False), ('Мюнхен', 'Сб 05.09 17:00', False),
            ('Вена', 'Вс 06.09 05:40', False), ('Одесса', 'Вс 06.09 16:30', False),
        ],
    },
    {
        'number': '20763', 'status': 'planned', 'route_variant': 'romania',
        'route_label': 'Из Одессы в Швейцарию через Румынию',
        'car_name': 'Mercedes-Benz Sprinter Lang', 'car_color': 'Серый',
        'drivers': ['Игорь П.', 'Сергей М.'],
        'start_city': 'Одесса', 'end_city': 'Женева', 'departure_city': 'odesa',
        'free_seats': 4, 'applied_count': 3, 'is_full': False, 'package_capacity_kg': 454,
        'stops': [
            ('Одесса', 'Вт 08.09 06:00', False), ('Измаил', 'Вт 08.09 09:30', False),
            ('Будапешт', 'Ср 09.09 06:00', False), ('Мюнхен', 'Ср 09.09 16:00', True),
            ('Цюрих', 'Ср 09.09 20:00', False), ('Берн', 'Ср 09.09 21:10', False),
            ('Сьон', 'Чт 10.09 16:00', False), ('Женева', 'Чт 10.09 19:20', False),
        ],
    },
]

POINTS = [
    ('Остановка', 'Брукк-ан-дер-Мур', 'Австрия', 'Bahnhofstraße 22, 8600 Bruck an der Mur, Австрия', 'https://maps.app.goo.gl/zTVFKS1omJurwzU89', 'Парковка перед жд вокзалом', False),
    ('Остановка', 'Вена', 'Австрия', 'Wiedner Gürtel 1B, 1100 Wien, Austria', 'https://goo.gl/maps/oiRmmDc2jVbgsp9c9', 'Парковка недалеко от вокзала', False),
    ('Остановка', 'Грац', 'Австрия', 'Europapl. 6, 8020 Graz, Австрия', 'https://maps.app.goo.gl/EFsaAakkp7c8jJaY6', 'Парковка перед супермаркетом SPAR', True),
    ('Остановка', 'Будапешт', 'Венгрия', 'Kerepesi út 2-4', 'https://maps.app.goo.gl/WAAvfpuKBg6UkV8X6', 'Парковка возле вокзала Keleti', False),
    ('Остановка', 'Мюнхен', 'Германия', 'Walter-Sedlmayr-Platz 6, 80995 München, Германия', 'https://maps.app.goo.gl/mYGGk8KnrWLih7h18', 'Парковка возле станции Feldmoching', False),
    ('Остановка', 'Пассау', 'Германия', 'Neuburger Str. 128, 94036 Passau', 'https://maps.app.goo.gl/GBoUZVsJJDrZJyTF8', 'Парковка Kaufland', True),
    ('Остановка', 'Бухарест', 'Румыния', 'Bulevardul Dinicu Golescu 31, București, Румыния', 'https://maps.app.goo.gl/ufQBwF6tRy7ZU5gk6', 'Парковка возле жд вокзала', False),
    ('Остановка', 'Измаил', 'Украина', 'Броска, Одеська область, 68663', 'https://maps.app.goo.gl/t6mhvQYGf5ZrgQYr9', 'Остановка возле магазина', False),
    ('Склад', 'Одесса', 'Украина', 'вулиця Академіка Корольова, 24, Одеса', 'https://maps.app.goo.gl/ZHDprEk1JmXWCuhJ8', 'Напротив Обл ГАИ', False),
    ('Остановка', 'Женева', 'Швейцария', 'Prom. Charles-Martin 17', 'https://goo.gl/maps/CiNNvWGPSsmfQbnr8', 'Парковка вдоль улицы', True),
    ('Остановка', 'Цюрих', 'Швейцария', 'Gessnerallee 38a, 8001 Zürich, Швейцария', 'https://maps.app.goo.gl/NYXUiBdVNKPs64p97', 'Парковка возле дома', False),
    ('Остановка', 'Сьон', 'Швейцария', 'Rte des Ronquos 100', 'https://maps.app.goo.gl/J5onBnhfBLdy6dsG7', 'Парковка возле ТЦ ALIGRO', True),
]


class Command(BaseCommand):
    help = 'Seed the database with demo trips and points matching the frontend mock data.'

    def handle(self, *args, **options):
        Stop.objects.all().delete()
        Trip.objects.all().delete()
        Point.objects.all().delete()

        for data in TRIPS:
            stops = data.pop('stops')
            trip = Trip.objects.create(**data)
            for order, (city, time, is_key) in enumerate(stops):
                Stop.objects.create(trip=trip, city=city, time=time, is_key_stop=is_key, order=order)

        for point_type, title, country, address, maps_url, description, delivery in POINTS:
            Point.objects.create(
                type=point_type, title=title, country=country, address=address,
                maps_url=maps_url, description=description, address_delivery_available=delivery,
            )

        self.stdout.write(self.style.SUCCESS(
            f'Seeded {len(TRIPS)} trips and {len(POINTS)} points.'
        ))
