import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactItems, navItems } from '../data/nav';
import { useLanguage } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import './SlideoutMenu.css';

interface SlideoutMenuProps {
  open: boolean;
  onClose: () => void;
  activeHref: string;
}

export function SlideoutMenu({ open, onClose, activeHref }: SlideoutMenuProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`slideout-backdrop ${open ? 'slideout-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={`slideout ${open ? 'slideout--open' : ''}`}
        aria-label={t('header.menu')}
        aria-hidden={!open}
      >
        <div className="slideout__top">
          <span className="slideout__title">{t('header.menu')}</span>
          <button
            type="button"
            className="slideout__close"
            onClick={onClose}
            aria-label={t('header.closeMenu')}
          >
            <Icon name="close" />
          </button>
        </div>

        <ul className="slideout__links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={item.href === activeHref ? 'slideout__link slideout__link--active' : 'slideout__link'}
                onClick={onClose}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="slideout__contacts">
          {contactItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                item.href.startsWith('http') ? (
                  <a href={item.href} className="slideout__contact" target="_blank" rel="noopener noreferrer">
                    <Icon name={item.icon} size={17} />
                    <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
                  </a>
                ) : (
                  <Link to={item.href} className="slideout__contact" onClick={onClose}>
                    <Icon name={item.icon} size={17} />
                    <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
                  </Link>
                )
              ) : (
                <span className="slideout__contact">
                  <Icon name={item.icon} size={17} />
                  <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
