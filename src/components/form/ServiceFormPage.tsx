import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import './FormPage.css';

interface ServiceFormPageProps {
  title: string;
  backTo: string;
  backLabel: string;
  warning?: ReactNode;
  submitted: boolean;
  successTitle: string;
  successText: ReactNode;
  error?: string | null;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function ServiceFormPage({
  title,
  backTo,
  backLabel,
  warning,
  submitted,
  successTitle,
  successText,
  error,
  children,
  onSubmit,
}: ServiceFormPageProps) {
  const { t } = useLanguage();

  return (
    <div className="form-page">
      <Link to={backTo} className="form-page__back">
        <span aria-hidden="true">←</span> {backLabel}
      </Link>

      {submitted ? (
        <div className="form-page__success">
          <h1 className="form-page__title">{successTitle}</h1>
          <p>{successText}</p>
          <Link to={backTo} className="form-page__btn">
            {t('common.returnBack')}
          </Link>
        </div>
      ) : (
        <>
          <h1 className="form-page__title">{title}</h1>
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
