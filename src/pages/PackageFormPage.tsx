import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { allCities } from '../data/cities';
import { getSpecialCargoOptions } from '../data/specialCargo';
import { formatTripLabel } from '../data/trips';
import { FormPage } from '../components/form/FormPage';
import { PhoneListField } from '../components/form/PhoneListField';
import type { PhotoEntry } from '../components/form/PhotoListField';
import { PhotoListField } from '../components/form/PhotoListField';
import { MultiSelectField, SelectField, TextAreaField, TextField } from '../components/form/fields';
import { NotFoundTrip } from '../components/NotFoundTrip';
import { useTrip } from '../hooks/useTrip';
import { useLanguage } from '../i18n/LanguageContext';
import { submitPackageApplication } from '../lib/api';

const placeOptions = Array.from({ length: 9 }, (_, i) => String(i + 1));

export function PackageFormPage() {
  const { t, lang } = useLanguage();
  const { tripId } = useParams<{ tripId: string }>();
  const { trip, loading: tripLoading } = useTrip(tripId);
  const specialCargoOptions = getSpecialCargoOptions(lang);

  const [place, setPlace] = useState('1');
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [weight, setWeight] = useState('');
  const [specialCargo, setSpecialCargo] = useState<string[]>([]);

  const [senderCity, setSenderCity] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhones, setSenderPhones] = useState<string[]>(['']);
  const [senderEmail, setSenderEmail] = useState('');
  const [senderTtn, setSenderTtn] = useState('');

  const [recipientCity, setRecipientCity] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhones, setRecipientPhones] = useState<string[]>(['']);

  const [promocode, setPromocode] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (tripLoading) return <p style={{ padding: 24 }}>{t('common.loading')}</p>;
  if (!trip) return <NotFoundTrip />;

  const effectiveSenderCity = senderCity || trip.startCity;
  const effectiveRecipientCity = recipientCity || trip.endCity;

  const handleWeightBlur = () => {
    const normalized = weight.trim().replace(',', '.');
    if (!normalized) return;
    const num = Number.parseFloat(normalized);
    if (!Number.isNaN(num) && !Number.isInteger(num)) {
      setWeight(String(Math.round(num)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitPackageApplication({
        trip_label: formatTripLabel(trip),
        place: Number(place),
        weight_kg: weight || '0',
        special_cargo: specialCargo,
        sender_city: effectiveSenderCity,
        sender_address: senderAddress,
        sender_name: senderName,
        sender_phones: senderPhones.filter(Boolean),
        sender_email: senderEmail,
        sender_ttn: senderTtn,
        recipient_city: effectiveRecipientCity,
        recipient_address: recipientAddress,
        recipient_name: recipientName,
        recipient_phones: recipientPhones.filter(Boolean),
        promocode,
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
    <FormPage
      title={t('package.title')}
      trip={trip}
      tripLabel={formatTripLabel(trip)}
      warning={t('package.warning')}
      submitted={submitted}
      successTitle={t('package.successTitle')}
      successText={t('package.successText', { number: trip.number })}
      error={error}
      onSubmit={handleSubmit}
    >
      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('package.infoSection')}</legend>

        <SelectField
          id="place"
          label={t('package.place')}
          required
          value={place}
          onChange={setPlace}
          options={placeOptions}
          hint={t('package.placeHint')}
        />

        <PhotoListField photos={photos} onChange={setPhotos} required />

        <TextField
          id="weight"
          label={t('package.weight')}
          required
          value={weight}
          onChange={setWeight}
          onBlur={handleWeightBlur}
          suffix="kg"
          hint={t('package.weightHint')}
        />

        <MultiSelectField
          id="special-cargo"
          label={t('package.specialCargo')}
          value={specialCargo}
          onChange={setSpecialCargo}
          options={specialCargoOptions}
          hint={t('package.specialCargoHint')}
        />
      </fieldset>

      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('package.senderSection')}</legend>

        <SelectField
          id="sender-city"
          label={t('package.city')}
          required
          value={effectiveSenderCity}
          onChange={setSenderCity}
          options={allCities}
          hint={t('package.senderCityHint')}
        />
        <TextField
          id="sender-address"
          label={t('package.address')}
          value={senderAddress}
          onChange={setSenderAddress}
          hint={t('package.senderAddressHint')}
        />
        <TextField id="sender-name" label={t('form.fullName')} required value={senderName} onChange={setSenderName} />
        <PhoneListField label={t('form.phone')} values={senderPhones} onChange={setSenderPhones} required />
        <TextField id="sender-email" label={t('form.email')} type="email" value={senderEmail} onChange={setSenderEmail} />
        <TextField
          id="sender-ttn"
          label={t('package.ttn')}
          value={senderTtn}
          onChange={setSenderTtn}
          hint={t('package.ttnHint')}
        />
      </fieldset>

      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('package.recipientSection')}</legend>

        <SelectField
          id="recipient-city"
          label={t('package.city')}
          required
          value={effectiveRecipientCity}
          onChange={setRecipientCity}
          options={allCities}
          hint={t('package.recipientCityHint')}
        />
        <TextField
          id="recipient-address"
          label={t('package.address')}
          value={recipientAddress}
          onChange={setRecipientAddress}
          hint={t('package.recipientAddressHint')}
        />
        <TextField
          id="recipient-name"
          label={t('form.fullName')}
          required
          value={recipientName}
          onChange={setRecipientName}
          hint={t('package.recipientNameHint')}
        />
        <PhoneListField label={t('form.phone')} values={recipientPhones} onChange={setRecipientPhones} required />
      </fieldset>

      <TextField
        id="promocode"
        label={t('form.promocode')}
        value={promocode}
        onChange={setPromocode}
        hint={t('form.promocodeHint')}
      />
      <TextAreaField id="note" label={t('form.note')} value={note} onChange={setNote} />

      <button type="submit" className="form-page__submit" disabled={submitting}>
        {t('common.save')}
      </button>
    </FormPage>
  );
}
