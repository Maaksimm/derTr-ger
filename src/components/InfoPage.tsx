import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import './InfoPage.css';

interface InfoPageProps {
  title: string;
  intro: ReactNode;
  children: ReactNode;
  ctaTo?: string;
  ctaLabelKey?: string;
}

export function InfoPage({ title, intro, children, ctaTo = '/', ctaLabelKey = 'common.orderRequest' }: InfoPageProps) {
  const { t } = useLanguage();

  return (
    <main className="info-page">
      <h1 className="info-page__title">{title}</h1>
      <p className="info-page__intro">{intro}</p>

      {children}

      <Link to={ctaTo} className="info-page__cta">
        {t(ctaLabelKey)}
      </Link>
    </main>
  );
}
