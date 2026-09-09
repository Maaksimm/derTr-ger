import type { Point, Trip } from '../types';

const API_BASE: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://127.0.0.1:8000/api';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new ApiError(res.status, body || `Request failed with ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ---- API-shape types (snake_case, as Django/DRF returns them) ----

interface ApiStop {
  id: number;
  city: string;
  time: string;
  is_key_stop: boolean;
  order: number;
}

interface ApiTrip {
  id: number;
  number: string;
  status: 'completed' | 'planned';
  route_variant: string;
  route_label: string;
  car_name: string;
  car_color: string;
  drivers: string[];
  start_city: string;
  end_city: string;
  departure_city: 'odesa' | 'kyiv';
  free_seats: number | null;
  applied_count: number;
  is_full: boolean;
  package_capacity_kg: number;
  stops: ApiStop[];
}

interface ApiPoint {
  id: number;
  type: 'Остановка' | 'Склад';
  title: string;
  country: string;
  address: string;
  maps_url: string;
  description: string;
  address_delivery_available: boolean;
}

// ---- Mappers: API shape -> the frontend's own Trip/Point types ----

function mapTrip(t: ApiTrip): Trip {
  return {
    id: t.number,
    number: t.number,
    status: t.status,
    routeVariant: (t.route_variant || 'west-ukraine') as Trip['routeVariant'],
    routeLabel: t.route_label,
    car: { name: t.car_name, color: t.car_color },
    drivers: t.drivers,
    startCity: t.start_city,
    endCity: t.end_city,
    stops: t.stops.map((s) => ({
      id: String(s.id),
      city: s.city,
      time: s.time,
      isKeyStop: s.is_key_stop,
    })),
    passengers: {
      freeSeats: t.free_seats,
      applied: t.applied_count,
      isFull: t.is_full,
    },
    packageCapacityKg: t.package_capacity_kg,
  };
}

function mapPoint(p: ApiPoint): Point {
  return {
    id: String(p.id),
    type: p.type,
    title: p.title,
    country: p.country,
    address: p.address,
    mapsUrl: p.maps_url,
    description: p.description,
    addressDeliveryAvailable: p.address_delivery_available,
  };
}

// ---- Public reads ----

export async function fetchTrips(departureCity: 'odesa' | 'kyiv'): Promise<Trip[]> {
  const data = await apiFetch<Paginated<ApiTrip>>(`/trips/?departure_city=${departureCity}`);
  return data.results.map(mapTrip);
}

export async function fetchTripByNumber(number: string): Promise<Trip> {
  const data = await apiFetch<ApiTrip>(`/trips/${encodeURIComponent(number)}/`);
  return mapTrip(data);
}

export async function fetchPoints(): Promise<Point[]> {
  const data = await apiFetch<Paginated<ApiPoint>>('/points/?page_size=200');
  return data.results.map(mapPoint);
}

export async function fetchPointById(id: string): Promise<Point> {
  const data = await apiFetch<ApiPoint>(`/points/${encodeURIComponent(id)}/`);
  return mapPoint(data);
}

// ---- Public writes (the four site forms) ----

export interface PassengerApplicationPayload {
  trip_label: string;
  city_from: string;
  address_from?: string;
  city_to: string;
  address_to?: string;
  full_name: string;
  phones: string[];
  email?: string;
  promocode?: string;
  note?: string;
}

export function submitPassengerApplication(payload: PassengerApplicationPayload) {
  return apiFetch('/passenger-applications/', { method: 'POST', body: JSON.stringify(payload) });
}

export interface PackageApplicationPayload {
  trip_label: string;
  place: number;
  weight_kg: string;
  special_cargo: string[];
  sender_city: string;
  sender_address?: string;
  sender_name: string;
  sender_phones: string[];
  sender_email?: string;
  sender_ttn?: string;
  recipient_city: string;
  recipient_address?: string;
  recipient_name: string;
  recipient_phones: string[];
  promocode?: string;
  note?: string;
}

export function submitPackageApplication(payload: PackageApplicationPayload) {
  return apiFetch('/package-applications/', { method: 'POST', body: JSON.stringify(payload) });
}

export interface CarApplicationPayload {
  city_from: string;
  city_to: string;
  brand: string;
  model: string;
  color: string;
  registration_number: string;
  owner_name: string;
  owner_phones: string[];
  note?: string;
}

export function submitCarApplication(payload: CarApplicationPayload) {
  return apiFetch('/car-applications/', { method: 'POST', body: JSON.stringify(payload) });
}

export function submitRewardSignup(payload: { email: string; promocode?: string }) {
  return apiFetch('/reward-signups/', { method: 'POST', body: JSON.stringify(payload) });
}
