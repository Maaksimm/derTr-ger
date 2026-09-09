import { Link } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import { getRewardFaq } from '../data/faqReward';
import { useLanguage } from '../i18n/LanguageContext';
import '../components/InfoPage.css';
import './RewardPage.css';

export function RewardPage() {
  const { t, lang } = useLanguage();
  return (
    <main className="info-page">
      <h1 className="info-page__title">{t('reward.title')}</h1>

      <div className="reward-banner">
        <span className="reward-banner__percent">5%</span>
        <span className="reward-banner__plus">+5%</span>
      </div>

      <p className="info-page__intro">{t('reward.intro')}</p>

      <Link to="/reward/join" className="info-page__cta">
        {t('common.participate')}
      </Link>

      <h2 className="info-page__section-title">{t('common.faq')}</h2>
      <Accordion items={getRewardFaq(lang)} />
    </main>
  );
}
