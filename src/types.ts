export type TripStatus = 'completed' | 'planned';

export type RouteVariant = 'west-ukraine' | 'romania';

export type CityGroup = 'europe' | 'ukraine';

export interface Stop {
  id: string;
  city: string;
  time: string;
  /** Marks the pickup/hand-off point (bold stop on the original site) */
  isKeyStop?: boolean;
}

export interface PassengerInfo {
  freeSeats: number | null;
  applied: number;
  isFull: boolean;
}

export interface Trip {
  id: string;
  number: string;
  status: TripStatus;
  routeVariant: RouteVariant;
  routeLabel: string;
  car: {
    name: string;
    color: string;
  };
  drivers: string[];
  startCity: string;
  endCity: string;
  stops: Stop[];
  passengers: PassengerInfo;
  packageCapacityKg: number;
}

export interface CityOption {
  id: string;
  name: string;
  group: CityGroup;
}

export interface Point {
  id: string;
  type: 'Остановка' | 'Склад';
  title: string;
  country: string;
  address: string;
  mapsUrl: string;
  description: string;
  addressDeliveryAvailable: boolean;
}
