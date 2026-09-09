import { Accordion } from '../components/Accordion';
import { InfoPage } from '../components/InfoPage';
import { PriceTable } from '../components/PriceTable';
import { getTransportationFaq } from '../data/faqTransportation';
import { useLanguage } from '../i18n/LanguageContext';

export function TransportationPage() {
  const { t, lang } = useLanguage();
  const priceRows: string[][] = [
    [t('city.berehove'), '180 EUR', '210 EUR', '230 EUR'],
    [t('city.mukachevo'), '180 EUR', '210 EUR', '230 EUR'],
    [t('city.stryi'), '180 EUR', '210 EUR', '230 EUR'],
    [t('city.ternopil'), '180 EUR', '210 EUR', '230 EUR'],
    [t('city.khmelnytskyi'), '180 EUR', '210 EUR', '230 EUR'],
    [t('city.vinnytsia'), '180 EUR', '210 EUR', '230 EUR'],
    [t('city.haisyn'), '200 EUR', '230 EUR', '250 EUR'],
    [t('city.uman'), '200 EUR', '230 EUR', '250 EUR'],
    [t('city.odesa'), '200 EUR', '230 EUR', '250 EUR'],
  ];

  return (
    <InfoPage title={t('transportation.title')} intro={t('transportation.intro')}>
      <h2 className="info-page__section-title">{t('common.prices')}</h2>
      <PriceTable
        headers={[t('transportation.colUkraine'), t('country.austria'), t('country.germany'), t('country.switzerland')]}
        rows={priceRows}
      />

      <h2 className="info-page__section-title">{t('common.faq')}</h2>
      <Accordion items={getTransportationFaq(lang)} />
    </InfoPage>
  );
}
