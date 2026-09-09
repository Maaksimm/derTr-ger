import type { Lang } from '../i18n/translations';

export interface SpecialCargoOption {
  value: string;
  label: string;
}

const ru: SpecialCargoOption[] = [
  { value: 'fragile', label: 'Хрупкое' },
  { value: 'docs', label: 'Документы' },
  { value: 'jewelry', label: 'Драгоценности' },
  { value: 'branded_goods', label: 'Брендовые вещи (стоимостью от 500 евро)' },
  { value: 'smartphone_used', label: 'Смартфон б/у' },
  { value: 'tablet_used', label: 'Планшет б/у' },
  { value: 'meat', label: 'Мясные изделия или сало (максимум 1 кг)' },
  { value: 'medicine', label: 'Медикаменты (максимум 5 наименований до 5 шт.)' },
  { value: 'laptop_used', label: 'Ноутбук б/у' },
  { value: 'pc_used', label: 'Системный блок б/у' },
  { value: 'monitor_used', label: 'Монитор б/у' },
  { value: 'smartphone_new', label: 'Cмартфон новый' },
  { value: 'tablet_new', label: 'Планшет новый' },
  { value: 'bicycle_used', label: 'Велосипед б/у' },
  { value: 'ebike_used', label: 'Электровелосипед б/у' },
  { value: 'iphone', label: 'iPhone' },
  { value: 'tires_without_rims', label: 'Шины без дисков 4 шт' },
];

const uk: SpecialCargoOption[] = [
  { value: 'fragile', label: 'Крихке' },
  { value: 'docs', label: 'Документи' },
  { value: 'jewelry', label: 'Коштовності' },
  { value: 'branded_goods', label: 'Брендові речі (вартістю від 500 євро)' },
  { value: 'smartphone_used', label: 'Смартфон б/в' },
  { value: 'tablet_used', label: 'Планшет б/в' },
  { value: 'meat', label: "М'ясні вироби або сало (максимум 1 кг)" },
  { value: 'medicine', label: 'Медикаменти (максимум 5 найменувань до 5 шт.)' },
  { value: 'laptop_used', label: 'Ноутбук б/в' },
  { value: 'pc_used', label: 'Системний блок б/в' },
  { value: 'monitor_used', label: 'Монітор б/в' },
  { value: 'smartphone_new', label: 'Смартфон новий' },
  { value: 'tablet_new', label: 'Планшет новий' },
  { value: 'bicycle_used', label: 'Велосипед б/в' },
  { value: 'ebike_used', label: 'Електровелосипед б/в' },
  { value: 'iphone', label: 'iPhone' },
  { value: 'tires_without_rims', label: 'Шини без дисків 4 шт' },
];

export function getSpecialCargoOptions(lang: Lang): SpecialCargoOption[] {
  return lang === 'uk' ? uk : ru;
}
