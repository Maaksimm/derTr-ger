import { useEffect, useState } from 'react';
import { points as mockPoints } from '../data/points';
import { fetchPoints } from '../lib/api';
import type { Point } from '../types';

interface UsePointsResult {
  points: Point[];
  loading: boolean;
  usingFallback: boolean;
}

export function usePoints(): UsePointsResult {
  const [points, setPoints] = useState<Point[]>(mockPoints);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const apiPoints = await fetchPoints();
        if (cancelled) return;
        setPoints(apiPoints);
        setUsingFallback(false);
      } catch {
        if (!cancelled) setUsingFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { points, loading, usingFallback };
}
