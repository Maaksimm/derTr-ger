import { contactItems } from '../data/nav';
import { useLanguage } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import './Footer.css';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <span className="site-footer__brand-name">der Träger</span>
        <span className="site-footer__tag">
          {t('trips.title')} — {t('trips.odesa')} / {t('trips.kyiv')} — {t('country.switzerland')}
        </span>
      </div>

      <ul className="site-footer__contacts">
        {contactItems.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} className="site-footer__contact">
                <Icon name={item.icon} size={16} />
                <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
              </a>
            ) : (
              <span className="site-footer__contact">
                <Icon name={item.icon} size={16} />
                <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}
