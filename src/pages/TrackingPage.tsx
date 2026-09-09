import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../components/InfoPage.css';
import './TrackingPage.css';

export function TrackingPage() {
  const { t } = useLanguage();
  const [nid, setNid] = useState('');
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <main className="info-page">
      <h1 className="info-page__title">{t('tracking.title')}</h1>
      <p className="info-page__intro">{t('tracking.intro')}</p>

      <form className="tracking-form" onSubmit={handleSubmit}>
        <label className="tracking-form__field">
          <span>{t('tracking.packageNumber')}</span>
          <input type="text" value={nid} onChange={(e) => setNid(e.target.value)} />
        </label>
        <label className="tracking-form__field">
          <span>{t('tracking.senderPhone')}</span>
          <input
            type="tel"
            placeholder="+380XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <button type="submit" className="tracking-form__submit">
          {t('common.apply')}
        </button>
      </form>

      {searched && <p className="tracking-form__empty">{t('tracking.empty')}</p>}
    </main>
  );
}
