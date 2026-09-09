import type { ReactElement } from 'react';
import type { ContactItem } from '../data/nav';

type IconName = ContactItem['icon'] | 'menu' | 'close' | 'sun' | 'moon' | 'pin' | 'truck';

const paths: Record<IconName, ReactElement> = {
  telegram: (
    <path d="M21.5 4.5 3 11.6c-1 .4-1 1.6.1 1.9l4.4 1.4 1.7 5.3c.2.7 1.1.9 1.6.3l2.4-2.6 4.5 3.3c.7.5 1.7.1 1.9-.7L23 5.6c.2-.9-.7-1.6-1.5-1.1Zm-3.2 3.3-7.9 7.2-.3 3-1.4-4.3 9-6.6c.3-.2.6.2.4.4Z" />
  ),
  'telegram-group': (
    <>
      <circle cx="9" cy="9" r="3.3" />
      <circle cx="16" cy="10.5" r="2.6" />
      <path d="M3.5 19c.5-3 2.7-4.8 5.5-4.8s5 1.8 5.5 4.8" />
      <path d="M14.5 19c.4-2.2 1.9-3.6 4-3.6s3.5 1.3 4 3.6" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M6.5 14.5h3" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.6 1.9Z" />
  ),
  facebook: (
    <path d="M14.5 21v-7h2.3l.4-3H14.5V9.1c0-.9.2-1.5 1.5-1.5h1.6V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.6H9v3h2.5v7h3Z" />
  ),
  doc: (
    <>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 12.5h6M9 15.5h6M9 9.5h2" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />,
  pin: (
    <>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h10v9H3z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
};

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
