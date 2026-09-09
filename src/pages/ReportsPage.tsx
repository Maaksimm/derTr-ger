import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './ReportsPage.css';

const drivers = ['Мацегора', 'Розуменко'];

export function ReportsPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <main className="reports-page">
      <h1 className="reports-page__title">{t('reports.title')}</h1>

      <div className="reports-page__tabs" role="tablist">
        {drivers.map((name, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={
              'reports-page__tab' + (active === i ? ' reports-page__tab--active' : '')
            }
            onClick={() => setActive(i)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="reports-page__panel">{t('reports.denied')}</div>
    </main>
  );
}
