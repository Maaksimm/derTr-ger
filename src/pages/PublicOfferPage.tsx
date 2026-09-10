import { useLanguage } from '../i18n/LanguageContext';
import '../components/InfoPage.css';

export function PublicOfferPage() {
  const { t } = useLanguage();

  return (
    <main className="info-page">
      <h1 className="info-page__title">{t('publicoffer.title')}</h1>
      <p className="info-page__intro">{t('publicoffer.text')}</p>
    </main>
  );
}
