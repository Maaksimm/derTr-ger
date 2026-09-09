import type { TripStatus } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import './StatusBadge.css';

export function StatusBadge({ status }: { status: TripStatus }) {
  const { t } = useLanguage();
  const label = status === 'completed' ? t('trips.statusCompleted') : t('trips.statusPlanned');
  return <span className={`status-badge status-badge--${status}`}>{label}</span>;
}
