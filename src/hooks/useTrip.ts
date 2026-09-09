import { useEffect, useState } from 'react';
import { findTripById } from '../data/trips';
import { fetchTripByNumber } from '../lib/api';
import type { Trip } from '../types';

interface UseTripResult {
  trip: Trip | undefined;
  loading: boolean;
}

export function useTrip(tripNumber: string | undefined): UseTripResult {
  const [trip, setTrip] = useState<Trip | undefined>(() => findTripById(tripNumber));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!tripNumber) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const apiTrip = await fetchTripByNumber(tripNumber);
        if (!cancelled) setTrip(apiTrip);
      } catch {
        if (!cancelled) setTrip(findTripById(tripNumber));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tripNumber]);

  return { trip, loading };
}
