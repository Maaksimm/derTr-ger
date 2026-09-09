import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Trip } from '../../types';
import './FormPage.css';

interface FormPageProps {
  title: string;
  trip: Trip;
  tripLabel: string;
  warning?: ReactNode;
  submitted: boolean;
  successTitle: string;
  successText: ReactNode;
  error?: string | null;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function FormPage({
  title,
  trip,
  tripLabel,
  warning,
  submitted,
  successTitle,
  successText,
  error,
  children,
  onSubmit,
}: FormPageProps) {
  const { t } = useLanguage();

  return (
    <div className="form-page">
      <Link to="/" className="form-page__back">
        <span aria-hidden="true">←</span> {t('common.backToTrips')}
      </Link>

      {submitted ? (
        <div className="form-page__success">
          <h1 className="form-page__title">{successTitle}</h1>
          <p>{successText}</p>
          <Link to="/" className="form-page__btn">
            {t('common.backToTrips')}
          </Link>
        </div>
      ) : (
        <>
          <h1 className="form-page__title">{title}</h1>

          <div className="form-page__trip-summary">
            <span className="form-page__trip-number">#{trip.number}</span>
            <span>
              {trip.startCity} → {trip.endCity}
            </span>
            <span className="form-page__trip-label">{tripLabel}</span>
          </div>

          {warning && <div className="form-page__warning">{warning}</div>}
          {error && <div className="form-page__error">{error}</div>}

          <form className="form-page__form" onSubmit={onSubmit}>
            {children}
          </form>
        </>
      )}
    </div>
  );
}
