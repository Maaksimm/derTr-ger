import { useEffect, useState } from 'react';
import { kyivTrips as mockKyivTrips, trips as mockOdesaTrips } from '../data/trips';
import { fetchTrips } from '../lib/api';
import type { Trip } from '../types';

interface UseTripsResult {
  odesaTrips: Trip[];
  kyivTrips: Trip[];
  loading: boolean;
  /** true once we know the API call failed and mock data is being shown instead */
  usingFallback: boolean;
}

export function useTrips(): UseTripsResult {
  const [odesaTrips, setOdesaTrips] = useState<Trip[]>(mockOdesaTrips);
  const [kyivTrips, setKyivTrips] = useState<Trip[]>(mockKyivTrips);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [odesa, kyiv] = await Promise.all([fetchTrips('odesa'), fetchTrips('kyiv')]);
        if (cancelled) return;
        setOdesaTrips(odesa);
        setKyivTrips(kyiv);
        setUsingFallback(false);
      } catch {
        if (cancelled) return;
        // API unreachable (e.g. backend not running) — keep the mock data
        // already in state so the page stays fully usable.
        setUsingFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { odesaTrips, kyivTrips, loading, usingFallback };
}
