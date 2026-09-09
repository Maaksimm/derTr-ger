import type { Theme } from '../hooks/useTheme';
import { useLanguage } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';
import { languageLabels } from '../i18n/translations';
import { Icon } from './Icon';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
}

const languages: Lang[] = ['ru', 'uk'];

export function Header({ theme, onToggleTheme, onOpenMenu }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="header">
      <button
        type="button"
        className="header__menu-btn"
        onClick={onOpenMenu}
        aria-label={t('header.openMenu')}
      >
        <Icon name="menu" />
        <span>{t('header.menu')}</span>
      </button>

      <a className="header__brand" href="/">
        <span className="header__brand-mark" aria-hidden="true">
          <Icon name="truck" size={20} />
        </span>
        <span className="header__brand-name">
          der Tr<span className="header__umlaut">ä</span>ger
        </span>
      </a>

      <div className="header__actions">
        <div className="header__lang" role="group" aria-label={t('header.language')}>
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              className={
                'header__lang-btn' + (lang === l ? ' header__lang-btn--active' : '')
              }
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
            >
              {languageLabels[l]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="header__theme-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? t('header.lightTheme') : t('header.darkTheme')}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  );
}
