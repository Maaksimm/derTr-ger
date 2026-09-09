import { useState } from 'react';
import { allCities } from '../data/cities';
import { PhoneListField } from '../components/form/PhoneListField';
import type { PhotoEntry } from '../components/form/PhotoListField';
import { PhotoListField } from '../components/form/PhotoListField';
import { SelectField, TextAreaField, TextField } from '../components/form/fields';
import { ServiceFormPage } from '../components/form/ServiceFormPage';
import { useLanguage } from '../i18n/LanguageContext';
import { submitCarApplication } from '../lib/api';

export function CarFormPage() {
  const { t } = useLanguage();
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [number, setNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhones, setOwnerPhones] = useState<string[]>(['']);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitCarApplication({
        city_from: cityFrom,
        city_to: cityTo,
        brand,
        model,
        color,
        registration_number: number,
        owner_name: ownerName,
        owner_phones: ownerPhones.filter(Boolean),
        note,
      });
      setSubmitted(true);
    } catch {
      setError(t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ServiceFormPage
      title={t('carform.title')}
      backTo="/lafet"
      backLabel={t('carform.back')}
      submitted={submitted}
      successTitle={t('carform.successTitle')}
      successText={t('carform.successText')}
      error={error}
      onSubmit={handleSubmit}
    >
      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('carform.deliverySection')}</legend>
        <SelectField
          id="car-from"
          label={t('form.from')}
          required
          value={cityFrom}
          onChange={setCityFrom}
          options={allCities}
        />
        <SelectField
          id="car-to"
          label={t('form.to')}
          required
          value={cityTo}
          onChange={setCityTo}
          options={allCities}
        />
      </fieldset>

      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('carform.carSection')}</legend>
        <PhotoListField photos={photos} onChange={setPhotos} required />
        <TextField id="brand" label={t('carform.brand')} required value={brand} onChange={setBrand} />
        <TextField id="model" label={t('carform.model')} required value={model} onChange={setModel} />
        <TextField id="color" label={t('carform.color')} required value={color} onChange={setColor} />
        <TextField
          id="number"
          label={t('carform.number')}
          required
          value={number}
          onChange={setNumber}
        />
      </fieldset>

      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('carform.ownerSection')}</legend>
        <TextField
          id="owner-name"
          label={t('form.fullName')}
          required
          value={ownerName}
          onChange={setOwnerName}
        />
        <PhoneListField label={t('form.phone')} values={ownerPhones} onChange={setOwnerPhones} />
      </fieldset>

      <TextAreaField id="note" label={t('form.note')} value={note} onChange={setNote} />

      <button type="submit" className="form-page__submit" disabled={submitting}>
        {t('common.save')}
      </button>
    </ServiceFormPage>
  );
}
