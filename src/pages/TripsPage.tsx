import { useMemo, useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { TripCard } from '../components/TripCard';
import type { FiltersState } from '../components/TripFilters';
import { TripFilters } from '../components/TripFilters';
import { TripTabs } from '../components/TripTabs';
import type { TabKey } from '../components/TripTabs';
import { viaCities } from '../data/trips';
import { useTrips } from '../hooks/useTrips';
import { useLanguage } from '../i18n/LanguageContext';

const initialFilters: FiltersState = { direction: 'all', viaCity: 'all', number: '' };

export function TripsPage() {
  const { t } = useLanguage();
  const { odesaTrips, kyivTrips, loading } = useTrips();
  const [tab, setTab] = useState<TabKey>('odesa');
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  const activeTrips = tab === 'odesa' ? odesaTrips : kyivTrips;

  const filteredTrips = useMemo(() => {
    return activeTrips.filter((trip) => {
      if (filters.direction === 'europe' && trip.endCity.toLowerCase().includes('одесса')) return false;
      if (filters.direction === 'ukraine' && !trip.endCity.toLowerCase().includes('одесса')) return false;
      if (filters.viaCity !== 'all' && !trip.stops.some((s) => s.city.trim() === filters.viaCity)) {
        return false;
      }
      if (filters.number.trim() && !trip.number.includes(filters.number.trim())) return false;
      return true;
    });
  }, [activeTrips, filters]);

  return (
    <main className="page">
      <div className="page__intro">
        <h1 className="page__title">{t('trips.title')}</h1>
        <p className="page__subtitle">{t('trips.subtitle')}</p>
      </div>

      <div className="page__controls">
        <TripTabs
          active={tab}
          onChange={(next) => {
            setTab(next);
            setFilters(initialFilters);
          }}
          counts={{ odesa: odesaTrips.length, kyiv: kyivTrips.length }}
        />
      </div>

      <TripFilters value={filters} onChange={setFilters} cities={viaCities} />

      <div className="trip-list">
        {loading ? (
          <EmptyState message={t('common.loading')} />
        ) : filteredTrips.length === 0 ? (
          <EmptyState message={tab === 'kyiv' ? t('trips.emptyKyiv') : t('trips.emptyFiltered')} />
        ) : (
          filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        )}
      </div>
    </main>
  );
}
