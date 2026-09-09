import { useLanguage } from '../i18n/LanguageContext';
import '../components/InfoPage.css';
import './CardPaymentPage.css';

export function CardPaymentPage() {
  const { t } = useLanguage();
  return (
    <main className="info-page">
      <h1 className="info-page__title">{t('cardpayment.title')}</h1>
      <p className="info-page__intro">{t('cardpayment.intro')}</p>

      <div className="cardpayment-block">
        <p>{t('cardpayment.p1')}</p>
        <p>{t('cardpayment.p2')}</p>
        <p>{t('cardpayment.p3')}</p>
        <ul>
          <li>{t('cardpayment.li1')}</li>
          <li>{t('cardpayment.li2')}</li>
        </ul>
        <p>{t('cardpayment.p4')}</p>
      </div>

      <div className="cardpayment-warning">{t('cardpayment.warning')}</div>
    </main>
  );
}
