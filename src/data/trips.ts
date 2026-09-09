import type { CityOption, Trip } from '../types';

/**
 * Demo data modeled on the structure of the live "Прямые рейсы" (Direct trips)
 * page: two route families (via West Ukraine / via Romania), each running
 * Odesa <-> Switzerland with a long chain of pickup/drop-off stops.
 * In production this would come from the same backend that powers the
 * original Drupal "trips" view.
 */
export const trips: Trip[] = [
  {
    id: '20613',
    number: '20613',
    status: 'completed',
    routeVariant: 'west-ukraine',
    routeLabel: 'Из Одессы в Швейцарию через запад Украины',
    car: { name: 'Mercedes-Benz Sprinter Lang', color: 'Серый' },
    drivers: ['Игорь П.', 'Сергей М.'],
    startCity: 'Сьон',
    endCity: 'Одесса',
    stops: [
      { id: 's1', city: 'Сьон', time: 'Чт 27.08 10:00' },
      { id: 's2', city: 'Мартиньи', time: 'Чт 27.08 10:40' },
      { id: 's3', city: 'Лозанна', time: 'Чт 27.08 13:10' },
      { id: 's4', city: 'Женева', time: 'Чт 27.08 14:00', isKeyStop: true },
      { id: 's5', city: 'Цюрих', time: 'Сб 29.08 06:00' },
      { id: 's6', city: 'Санкт Галлен', time: 'Сб 29.08 07:00' },
      { id: 's7', city: 'Мемминген', time: 'Сб 29.08 08:20' },
      { id: 's8', city: 'Вена', time: 'Сб 29.08 14:20' },
      { id: 's9', city: 'Одесса', time: 'Вс 30.08 16:00' },
    ],
    passengers: { freeSeats: 0, applied: 8, isFull: true },
    packageCapacityKg: 0,
  },
  {
    id: '20612',
    number: '20612',
    status: 'planned',
    routeVariant: 'romania',
    routeLabel: 'Из Одессы в Швейцарию через Румынию',
    car: { name: 'Mercedes-Benz Sprinter Lang', color: 'Синий' },
    drivers: ['Владимир С.', 'Вячеслав В.'],
    startCity: 'Одесса',
    endCity: 'Женева',
    stops: [
      { id: 's1', city: 'Одесса', time: 'Вт 01.09 06:00' },
      { id: 's2', city: 'Вена', time: 'Ср 02.09 06:10' },
      { id: 's3', city: 'Мюнхен', time: 'Ср 02.09 11:30' },
      { id: 's4', city: 'Цюрих', time: 'Ср 02.09 15:30' },
      { id: 's5', city: 'Берн', time: 'Ср 02.09 18:30' },
      { id: 's6', city: 'Лозанна', time: 'Ср 02.09 20:00' },
      { id: 's7', city: 'Сьон', time: 'Ср 02.09 23:20', isKeyStop: true },
      { id: 's8', city: 'Женева', time: 'Чт 03.09 13:50' },
    ],
    passengers: { freeSeats: null, applied: 8, isFull: true },
    packageCapacityKg: 60,
  },
  {
    id: '20614',
    number: '20614',
    status: 'planned',
    routeVariant: 'west-ukraine',
    routeLabel: 'Из Одессы в Швейцарию через запад Украины',
    car: { name: 'Mercedes-Benz Sprinter Lang', color: 'Синий' },
    drivers: ['Владимир С.', 'Вячеслав В.'],
    startCity: 'Сьон',
    endCity: 'Одесса',
    stops: [
      { id: 's1', city: 'Сьон', time: 'Чт 03.09 10:00' },
      { id: 's2', city: 'Мартиньи', time: 'Чт 03.09 10:40' },
      { id: 's3', city: 'Женева', time: 'Чт 03.09 19:20', isKeyStop: true },
      { id: 's4', city: 'Берн', time: 'Сб 05.09 09:40' },
      { id: 's5', city: 'Цюрих', time: 'Сб 05.09 11:20' },
      { id: 's6', city: 'Мюнхен', time: 'Сб 05.09 17:00' },
      { id: 's7', city: 'Вена', time: 'Вс 06.09 05:40' },
      { id: 's8', city: 'Одесса', time: 'Вс 06.09 16:30' },
    ],
    passengers: { freeSeats: 7, applied: 5, isFull: false },
    packageCapacityKg: 492,
  },
  {
    id: '20763',
    number: '20763',
    status: 'planned',
    routeVariant: 'romania',
    routeLabel: 'Из Одессы в Швейцарию через Румынию',
    car: { name: 'Mercedes-Benz Sprinter Lang', color: 'Серый' },
    drivers: ['Игорь П.', 'Сергей М.'],
    startCity: 'Одесса',
    endCity: 'Женева',
    stops: [
      { id: 's1', city: 'Одесса', time: 'Вт 08.09 06:00' },
      { id: 's2', city: 'Измаил', time: 'Вт 08.09 09:30' },
      { id: 's3', city: 'Будапешт', time: 'Ср 09.09 06:00' },
      { id: 's4', city: 'Мюнхен', time: 'Ср 09.09 16:00', isKeyStop: true },
      { id: 's5', city: 'Цюрих', time: 'Ср 09.09 20:00' },
      { id: 's6', city: 'Берн', time: 'Ср 09.09 21:10' },
      { id: 's7', city: 'Сьон', time: 'Чт 10.09 16:00' },
      { id: 's8', city: 'Женева', time: 'Чт 10.09 19:20' },
    ],
    passengers: { freeSeats: 4, applied: 3, isFull: false },
    packageCapacityKg: 454,
  },
  {
    id: '20765',
    number: '20765',
    status: 'planned',
    routeVariant: 'west-ukraine',
    routeLabel: 'Из Одессы в Швейцарию через запад Украины',
    car: { name: 'Mercedes-Benz Sprinter Lang', color: 'Серый' },
    drivers: ['Игорь П.', 'Сергей М.'],
    startCity: 'Сьон',
    endCity: 'Одесса',
    stops: [
      { id: 's1', city: 'Сьон', time: 'Чт 10.09 10:00' },
      { id: 's2', city: 'Лозанна', time: 'Чт 10.09 12:40' },
      { id: 's3', city: 'Женева', time: 'Чт 10.09 19:20', isKeyStop: true },
      { id: 's4', city: 'Берн', time: 'Сб 12.09 09:40' },
      { id: 's5', city: 'Цюрих', time: 'Сб 12.09 11:20' },
      { id: 's6', city: 'Мюнхен', time: 'Сб 12.09 17:00' },
      { id: 's7', city: 'Вена', time: 'Вс 13.09 05:40' },
      { id: 's8', city: 'Одесса', time: 'Вс 13.09 16:30' },
    ],
    passengers: { freeSeats: 6, applied: 0, isFull: false },
    packageCapacityKg: 500,
  },
  {
    id: '20770',
    number: '20770',
    status: 'planned',
    routeVariant: 'west-ukraine',
    routeLabel: 'Из Одессы в Швейцарию через запад Украины',
    car: { name: 'Mercedes-Benz Sprinter Lang', color: 'Синий' },
    drivers: ['Владимир С.', 'Вячеслав В.'],
    startCity: 'Сьон',
    endCity: 'Одесса',
    stops: [
      { id: 's1', city: 'Сьон', time: 'Чт 01.10 10:00' },
      { id: 's2', city: 'Лозанна', time: 'Чт 01.10 12:40' },
      { id: 's3', city: 'Женева', time: 'Чт 01.10 19:20', isKeyStop: true },
      { id: 's4', city: 'Берн', time: 'Сб 03.10 09:40' },
      { id: 's5', city: 'Цюрих', time: 'Сб 03.10 11:20' },
      { id: 's6', city: 'Мюнхен', time: 'Сб 03.10 17:00' },
      { id: 's7', city: 'Вена', time: 'Вс 04.10 05:40' },
      { id: 's8', city: 'Одесса', time: 'Вс 04.10 16:30' },
    ],
    passengers: { freeSeats: 7, applied: 1, isFull: false },
    packageCapacityKg: 500,
  },
];

export const kyivTrips: Trip[] = [];

export const allTrips: Trip[] = [...trips, ...kyivTrips];

export function findTripById(id: string | undefined): Trip | undefined {
  if (!id) return undefined;
  return allTrips.find((trip) => trip.id === id);
}

/** Mirrors the original site's "[Рейс 20612] 01.09.2026 06:00 Одесса - Женева [nid:20612]" label */
export function formatTripLabel(trip: Trip): string {
  const departure = trip.stops[0]?.time ?? '';
  return `[Рейс ${trip.number}] ${departure} ${trip.startCity} - ${trip.endCity} [nid:${trip.id}]`;
}

export const viaCities: CityOption[] = [
  { id: 'geneva', name: 'Женева', group: 'europe' },
  { id: 'zurich', name: 'Цюрих', group: 'europe' },
  { id: 'bern', name: 'Берн', group: 'europe' },
  { id: 'lausanne', name: 'Лозанна', group: 'europe' },
  { id: 'sion', name: 'Сьон', group: 'europe' },
  { id: 'munich', name: 'Мюнхен', group: 'europe' },
  { id: 'vienna', name: 'Вена', group: 'europe' },
  { id: 'budapest', name: 'Будапешт', group: 'europe' },
  { id: 'izmail', name: 'Измаил', group: 'ukraine' },
  { id: 'odessa', name: 'Одесса', group: 'ukraine' },
];
