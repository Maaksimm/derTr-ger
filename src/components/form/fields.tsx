import type { ReactNode, TextareaHTMLAttributes } from 'react';
import './fields.css';

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  hint?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
}

export function FieldWrapper({ label, required, hint, htmlFor, children }: FieldWrapperProps) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={htmlFor}>
        {label}
        {required && <span className="field__required"> *</span>}
      </label>
      {children}
      {hint && <p className="field__hint">{hint}</p>}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  hint?: ReactNode;
  placeholder?: string;
  suffix?: string;
  type?: 'text' | 'email' | 'tel';
  readOnly?: boolean;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  hint,
  placeholder,
  suffix,
  type = 'text',
  readOnly,
}: TextFieldProps) {
  return (
    <FieldWrapper label={label} required={required} hint={hint} htmlFor={id}>
      <div className="field__control-row">
        <input
          id={id}
          type={type}
          className="field__input"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
        {suffix && <span className="field__suffix">{suffix}</span>}
      </div>
    </FieldWrapper>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  hint?: ReactNode;
  emptyOption?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required,
  hint,
  emptyOption,
}: SelectFieldProps) {
  return (
    <FieldWrapper label={label} required={required} hint={hint} htmlFor={id}>
      <select
        id={id}
        className="field__input field__select"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      >
        {emptyOption && <option value="">{emptyOption}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

interface MultiSelectFieldProps {
  id: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  hint?: ReactNode;
}

export function MultiSelectField({ id, label, value, onChange, options, hint }: MultiSelectFieldProps) {
  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <FieldWrapper label={label} hint={hint} htmlFor={id}>
      <div className="field__checkbox-grid" id={id}>
        {options.map((opt) => (
          <label key={opt.value} className="field__checkbox">
            <input
              type="checkbox"
              checked={value.includes(opt.value)}
              onChange={() => toggle(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

interface TextAreaFieldProps
  extends Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: ReactNode;
}

export function TextAreaField({ id, label, value, onChange, hint, rows = 4 }: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} hint={hint} htmlFor={id}>
      <textarea
        id={id}
        className="field__input field__textarea"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldWrapper>
  );
}
