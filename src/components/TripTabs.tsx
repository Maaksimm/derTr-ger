import { useLanguage } from '../i18n/LanguageContext';
import './TripTabs.css';

export type TabKey = 'odesa' | 'kyiv';

interface TripTabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  counts: Record<TabKey, number>;
}

export function TripTabs({ active, onChange, counts }: TripTabsProps) {
  const { t } = useLanguage();
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'odesa', label: t('trips.odesa') },
    { key: 'kyiv', label: t('trips.kyiv') },
  ];

  return (
    <div className="trip-tabs" role="tablist" aria-label={t('trips.departureCityLabel')}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          className={active === tab.key ? 'trip-tabs__tab trip-tabs__tab--active' : 'trip-tabs__tab'}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
          <span className="trip-tabs__count">{counts[tab.key]}</span>
        </button>
      ))}
    </div>
  );
}
