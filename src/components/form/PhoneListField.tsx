import { useLanguage } from '../../i18n/LanguageContext';
import { Icon } from '../Icon';
import './PhoneListField.css';

interface PhoneListFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}

export function PhoneListField({ label, values, onChange, required }: PhoneListFieldProps) {
  const { t } = useLanguage();

  const update = (index: number, value: string) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const add = () => onChange([...values, '']);

  return (
    <div className="field phone-list">
      <label className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </label>

      {values.map((value, index) => (
        <div className="phone-list__row" key={index}>
          <input
            type="tel"
            className="field__input"
            placeholder="+380XXXXXXXXX"
            value={value}
            required={required && index === 0}
            onChange={(e) => update(index, e.target.value)}
          />
          {values.length > 1 && (
            <button
              type="button"
              className="phone-list__remove"
              onClick={() => remove(index)}
              aria-label={t('form.removePhone')}
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      ))}

      <button type="button" className="phone-list__add" onClick={add}>
        {t('form.addPhone')}
      </button>

      <p className="field__hint">{t('form.phoneHint')}</p>
    </div>
  );
}
