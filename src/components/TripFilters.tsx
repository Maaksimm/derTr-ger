import { useLanguage } from '../i18n/LanguageContext';
import type { CityOption } from '../types';
import './TripFilters.css';

export interface FiltersState {
  direction: 'all' | 'europe' | 'ukraine';
  viaCity: string;
  number: string;
}

interface TripFiltersProps {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  cities: CityOption[];
}

export function TripFilters({ value, onChange, cities }: TripFiltersProps) {
  const { t } = useLanguage();

  return (
    <form className="trip-filters" onSubmit={(e) => e.preventDefault()}>
      <label className="trip-filters__field">
        <span>{t('trips.filterDirection')}</span>
        <select
          value={value.direction}
          onChange={(e) => onChange({ ...value, direction: e.target.value as FiltersState['direction'] })}
        >
          <option value="all">{t('common.all')}</option>
          <option value="europe">{t('trips.directionEurope')}</option>
          <option value="ukraine">{t('trips.directionUkraine')}</option>
        </select>
      </label>

      <label className="trip-filters__field">
        <span>{t('trips.filterVia')}</span>
        <select value={value.viaCity} onChange={(e) => onChange({ ...value, viaCity: e.target.value })}>
          <option value="all">{t('common.all')}</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      <label className="trip-filters__field">
        <span>{t('trips.filterNumber')}</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder={t('trips.filterNumberPlaceholder')}
          value={value.number}
          onChange={(e) => onChange({ ...value, number: e.target.value })}
        />
      </label>
    </form>
  );
}
