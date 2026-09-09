import { Accordion } from '../components/Accordion';
import { InfoPage } from '../components/InfoPage';
import { PriceTable } from '../components/PriceTable';
import { getDeliveryFaq } from '../data/faqDelivery';
import { useLanguage } from '../i18n/LanguageContext';

export function DeliveryPage() {
  const { t, lang } = useLanguage();
  const priceRows: string[][] = [
    [t('delivery.rowUpTo10'), '20 EUR', '20 EUR', '25 EUR'],
    [t('delivery.rowOver10'), '2 EUR', '2 EUR', '2,50 EUR'],
  ];

  return (
    <InfoPage title={t('delivery.title')} intro={t('delivery.intro')}>
      <h2 className="info-page__section-title">{t('common.prices')}</h2>
      <PriceTable
        headers={[t('delivery.colType'), t('country.austria'), t('country.germany'), t('country.switzerland')]}
        rows={priceRows}
      />

      <h2 className="info-page__section-title">{t('common.faq')}</h2>
      <Accordion items={getDeliveryFaq(lang)} />
    </InfoPage>
  );
}
