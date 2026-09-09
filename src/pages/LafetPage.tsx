import { Link } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import { PriceTable } from '../components/PriceTable';
import { getLafetFaq } from '../data/faqLafet';
import { useLanguage } from '../i18n/LanguageContext';
import '../components/InfoPage.css';

export function LafetPage() {
  const { t, lang } = useLanguage();
  const priceRows: string[][] = [
    [t('country.austria'), '900 EUR'],
    [t('country.germany'), '1000 EUR'],
    [t('country.switzerland'), '1100 EUR'],
  ];

  return (
    <main className="info-page">
      <h1 className="info-page__title">{t('lafet.title')}</h1>
      <p className="info-page__intro">{t('lafet.intro')}</p>

      <h2 className="info-page__section-title">{t('common.prices')}</h2>
      <PriceTable headers={[t('lafet.colZone'), t('lafet.colPrice')]} rows={priceRows} />

      <Link to="/lafet/order" className="info-page__cta">
        {t('common.orderTransport')}
      </Link>

      <h2 className="info-page__section-title">{t('common.faq')}</h2>
      <Accordion items={getLafetFaq(lang)} />
    </main>
  );
}
