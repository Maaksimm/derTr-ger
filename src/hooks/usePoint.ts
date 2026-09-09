import { useEffect, useState } from 'react';
import { findPointById } from '../data/points';
import { fetchPointById } from '../lib/api';
import type { Point } from '../types';

interface UsePointResult {
  point: Point | undefined;
  loading: boolean;
}

export function usePoint(id: string | undefined): UsePointResult {
  const [point, setPoint] = useState<Point | undefined>(() => findPointById(id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const apiPoint = await fetchPointById(id);
        if (!cancelled) setPoint(apiPoint);
      } catch {
        if (!cancelled) setPoint(findPointById(id));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { point, loading };
}
