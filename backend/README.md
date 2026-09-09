# der Träger — backend (Django + Django REST Framework)

REST API for the frontend: trips, stops, points (stops/warehouses), and the
four public forms (passenger application, package application, car
transport order, loyalty-program signup). Confirmed working end-to-end
(migrations, seed data, GET and POST all smoke-tested) while building this.

## Stack

- Django 6.1 + Django REST Framework
- django-cors-headers (so the Vite dev server on a different port can call
  the API in development)
- SQLite by default (swap `DATABASES` in `dertrager_api/settings.py` for
  Postgres/MySQL in production)

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_demo_data  # optional: populates demo trips + points
                                  # matching the frontend's mock data
python manage.py createsuperuser # optional: to use /admin/

python manage.py runserver       # http://127.0.0.1:8000
```

## Endpoints (all under `/api/`)

| Endpoint                        | Methods   | Notes                                             |
|----------------------------------|-----------|----------------------------------------------------|
| `/api/trips/`                    | GET       | List trips (with nested `stops`). `?departure_city=odesa\|kyiv`, `?search=` |
| `/api/trips/<id>/`               | GET       | Single trip                                        |
| `/api/points/`                   | GET       | List stops/warehouses. `?country=`, `?type=Остановка\|Склад`, `?search=` |
| `/api/points/<id>/`              | GET       | Single point                                        |
| `/api/passenger-applications/`   | POST      | "Заявка на поездку" form submission                 |
| `/api/package-applications/`     | POST      | "Оформить посылку" form submission                  |
| `/api/car-applications/`         | POST      | Car-transport order form submission                 |
| `/api/reward-signups/`           | POST      | Loyalty-program join form (email only)               |

List endpoints are paginated (`?page=`), 50 per page by default
(`REST_FRAMEWORK.PAGE_SIZE` in settings).

Django admin (`/admin/`) is wired up for every model, including inline stop
editing on the Trip admin page — that's the intended way to manage trips
and points day-to-day.

## Connecting the React frontend

The frontend currently ships with its own mock data (`src/data/*.ts`) and
works standalone with no backend at all. To point it at this API instead:

1. Run this backend (`python manage.py runserver`).
2. In the frontend, set `VITE_API_BASE_URL=http://127.0.0.1:8000/api` (e.g.
   in a `.env.local` file — Vite picks these up automatically).
3. Replace the mock imports in `src/data/trips.ts` / `src/data/points.ts`
   with `fetch` calls to `${import.meta.env.VITE_API_BASE_URL}/trips/` and
   `/points/`, and wire the four form pages' `onSubmit` handlers to `POST`
   to the corresponding endpoint above instead of just flipping local
   `submitted` state.

This wiring wasn't done as part of this pass (the frontend's mock-data
version stays fully functional on its own), but the API shapes were
designed to match the frontend's TypeScript types field-for-field so that
swap is mechanical rather than a redesign.

## CORS / production notes

`CORS_ALLOW_ALL_ORIGINS = True` is set for local development convenience —
tighten this to `CORS_ALLOWED_ORIGINS = ["https://your-frontend-domain"]`
before deploying. Also update `SECRET_KEY`, `DEBUG = False`, and
`ALLOWED_HOSTS` in `dertrager_api/settings.py` for production, and put a
real database behind it.
