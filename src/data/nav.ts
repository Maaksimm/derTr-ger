export interface NavItem {
  /** translation key resolved via useLanguage().t() */
  labelKey: string;
  href: string;
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.trips', href: '/trips' },
  { labelKey: 'nav.transportation', href: '/transportation' },
  { labelKey: 'nav.delivery', href: '/delivery' },
  { labelKey: 'nav.tracking', href: '/tracking' },
  { labelKey: 'nav.lafet', href: '/lafet' },
  { labelKey: 'nav.points', href: '/points' },
  { labelKey: 'nav.reward', href: '/reward' },
  { labelKey: 'nav.reports', href: '/reports/trips' },
];

export interface ContactItem {
  label: string;
  labelKey?: string;
  href?: string;
  icon: 'telegram' | 'telegram-group' | 'card' | 'phone' | 'facebook' | 'doc';
}

export const contactItems: ContactItem[] = [
  { label: 'Написать сообщение', href: 'https://t.me/dertragercom', icon: 'telegram' },
  { label: 'Группа в Telegram', href: 'https://t.me/dertrager', icon: 'telegram-group' },
  { label: 'Оплата картой', labelKey: 'nav.cardpayment', href: '/cardpayment', icon: 'card' },
  { label: '+38 (093) 177-57-60', icon: 'phone' },
  { label: 'Мы в Facebook', href: 'https://facebook.com/dertrager/', icon: 'facebook' },
  { label: 'Публичная оферта', labelKey: 'nav.publicoffer', href: '/publicoffer', icon: 'doc' },
];
