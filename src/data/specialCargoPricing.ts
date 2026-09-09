import type { Lang } from '../i18n/translations';

export interface SpecialCargoPrice {
  label: string;
  price: string;
}

const ru: SpecialCargoPrice[] = [
  { label: 'Хрупкое', price: '+5 EUR' },
  { label: 'Драгоценности', price: '+5 EUR' },
  { label: 'Смартфон б/у', price: '+5 EUR' },
  { label: 'Планшет б/у', price: '+5 EUR' },
  { label: 'Документы', price: '+10 EUR' },
  { label: 'Мясные продукты или сало (максимум 1 кг)', price: '+10 EUR' },
  { label: 'Медикаменты (максимум 5 наименований до 5 шт.)', price: '+10 EUR' },
  { label: 'Ноутбук б/у', price: '+10 EUR' },
  { label: 'Системный блок б/у', price: '+10 EUR' },
  { label: 'Монитор б/у', price: '+10 EUR' },
  { label: 'Велосипед б/у', price: '+30 EUR' },
  { label: 'Электровелосипед б/у', price: '+30 EUR' },
  { label: 'Смартфон новый', price: '+30 EUR' },
  { label: 'Планшет новый', price: '+30 EUR' },
  { label: 'iPhone', price: '+50 EUR' },
  { label: 'Шины без дисков 4 шт', price: '+90 EUR' },
  { label: 'Брендовые вещи (стоимостью от 500 евро)', price: '+100 EUR' },
];

const uk: SpecialCargoPrice[] = [
  { label: 'Крихке', price: '+5 EUR' },
  { label: 'Коштовності', price: '+5 EUR' },
  { label: 'Смартфон б/в', price: '+5 EUR' },
  { label: 'Планшет б/в', price: '+5 EUR' },
  { label: 'Документи', price: '+10 EUR' },
  { label: "М'ясні продукти або сало (максимум 1 кг)", price: '+10 EUR' },
  { label: 'Медикаменти (максимум 5 найменувань до 5 шт.)', price: '+10 EUR' },
  { label: 'Ноутбук б/в', price: '+10 EUR' },
  { label: 'Системний блок б/в', price: '+10 EUR' },
  { label: 'Монітор б/в', price: '+10 EUR' },
  { label: 'Велосипед б/в', price: '+30 EUR' },
  { label: 'Електровелосипед б/в', price: '+30 EUR' },
  { label: 'Смартфон новий', price: '+30 EUR' },
  { label: 'Планшет новий', price: '+30 EUR' },
  { label: 'iPhone', price: '+50 EUR' },
  { label: 'Шини без дисків 4 шт', price: '+90 EUR' },
  { label: 'Брендові речі (вартістю від 500 євро)', price: '+100 EUR' },
];

export function getSpecialCargoPricing(lang: Lang): SpecialCargoPrice[] {
  return lang === 'uk' ? uk : ru;
}
