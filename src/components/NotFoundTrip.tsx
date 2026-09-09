import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import './NotFoundTrip.css';

export function NotFoundTrip() {
  const { t } = useLanguage();
  return (
    <div className="not-found-trip">
      <h1>{t('notfoundtrip.title')}</h1>
      <p>{t('notfoundtrip.hint')}</p>
      <Link to="/" className="not-found-trip__link">
        {t('common.backToTrips')}
      </Link>
    </div>
  );
}
