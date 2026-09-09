import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePoints } from '../hooks/usePoints';
import { useLanguage } from '../i18n/LanguageContext';
import '../components/InfoPage.css';
import './PointsPage.css';

interface PointsFilters {
  country: string;
  type: 'all' | 'Остановка' | 'Склад';
  deliveryOnly: boolean;
  query: string;
}

const initialFilters: PointsFilters = { country: 'all', type: 'all', deliveryOnly: false, query: '' };

export function PointsPage() {
  const { t } = useLanguage();
  const { points, loading } = usePoints();
  const [filters, setFilters] = useState<PointsFilters>(initialFilters);

  const countries = useMemo(() => Array.from(new Set(points.map((p) => p.country))), [points]);

  const filtered = useMemo(() => {
    return points.filter((p) => {
      if (filters.country !== 'all' && p.country !== filters.country) return false;
      if (filters.type !== 'all' && p.type !== filters.type) return false;
      if (filters.deliveryOnly && !p.addressDeliveryAvailable) return false;
      if (filters.query.trim() && !p.title.toLowerCase().includes(filters.query.trim().toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [points, filters]);

  return (
    <main className="info-page">
      <h1 className="info-page__title">{t('points.title')}</h1>
      <p className="info-page__intro">{t('points.intro')}</p>

      <form className="points-filters" onSubmit={(e) => e.preventDefault()}>
        <label className="points-filters__field">
          <span>{t('points.city')}</span>
          <input
            type="text"
            placeholder={t('points.cityPlaceholder')}
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />
        </label>
        <label className="points-filters__field">
          <span>{t('points.country')}</span>
          <select
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          >
            <option value="all">{t('common.all')}</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="points-filters__field">
          <span>{t('points.type')}</span>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as PointsFilters['type'] })}
          >
            <option value="all">{t('common.all')}</option>
            <option value="Остановка">{t('points.typeStop')}</option>
            <option value="Склад">{t('points.typeWarehouse')}</option>
          </select>
        </label>
        <label className="points-filters__checkbox">
          <input
            type="checkbox"
            checked={filters.deliveryOnly}
            onChange={(e) => setFilters({ ...filters, deliveryOnly: e.target.checked })}
          />
          <span>{t('points.deliveryOnly')}</span>
        </label>
      </form>

      {loading ? (
        <p className="points-list__empty">{t('common.loading')}</p>
      ) : (
        <ul className="points-list">
          {filtered.map((point) => (
            <li className="points-list__item" key={point.id}>
              <div className="points-list__main">
                <span className="points-list__type">{point.type}</span>
                <Link to={`/point/${point.id}`} className="points-list__title">
                  {point.title}
                </Link>
                <span className="points-list__country">{point.country}</span>
              </div>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="points-list__address"
              >
                {point.address}
              </a>
              <p className="points-list__description">{point.description}</p>
              <span
                className={
                  'points-list__delivery' +
                  (point.addressDeliveryAvailable ? ' points-list__delivery--yes' : '')
                }
              >
                {point.addressDeliveryAvailable ? t('points.deliveryYes') : t('points.deliveryNo')}
              </span>
            </li>
          ))}
          {filtered.length === 0 && <li className="points-list__empty">{t('points.empty')}</li>}
        </ul>
      )}
    </main>
  );
}
