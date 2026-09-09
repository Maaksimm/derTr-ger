import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { allCities } from '../data/cities';
import { formatTripLabel } from '../data/trips';
import { FormPage } from '../components/form/FormPage';
import { PhoneListField } from '../components/form/PhoneListField';
import { SelectField, TextAreaField, TextField } from '../components/form/fields';
import { NotFoundTrip } from '../components/NotFoundTrip';
import { useTrip } from '../hooks/useTrip';
import { useLanguage } from '../i18n/LanguageContext';
import { submitPassengerApplication } from '../lib/api';

export function PassengerFormPage() {
  const { t } = useLanguage();
  const { tripId } = useParams<{ tripId: string }>();
  const { trip, loading: tripLoading } = useTrip(tripId);

  const [cityFrom, setCityFrom] = useState('');
  const [addressFrom, setAddressFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [addressTo, setAddressTo] = useState('');
  const [fullName, setFullName] = useState('');
  const [phones, setPhones] = useState<string[]>(['']);
  const [email, setEmail] = useState('');
  const [promocode, setPromocode] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (tripLoading) return <p style={{ padding: 24 }}>{t('common.loading')}</p>;
  if (!trip) return <NotFoundTrip />;

  // Defaults derived from the trip, applied once it's known.
  const effectiveCityFrom = cityFrom || trip.startCity;
  const effectiveCityTo = cityTo || trip.endCity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitPassengerApplication({
        trip_label: formatTripLabel(trip),
        city_from: effectiveCityFrom,
        address_from: addressFrom,
        city_to: effectiveCityTo,
        address_to: addressTo,
        full_name: fullName,
        phones: phones.filter(Boolean),
        email,
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
      title={t('passenger.title')}
      trip={trip}
      tripLabel={formatTripLabel(trip)}
      warning={t('passenger.warning')}
      submitted={submitted}
      successTitle={t('passenger.successTitle')}
      successText={t('passenger.successText', { number: trip.number })}
      error={error}
      onSubmit={handleSubmit}
    >
      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('form.tripSection')}</legend>

        <SelectField
          id="city-from"
          label={t('form.from')}
          required
          value={effectiveCityFrom}
          onChange={setCityFrom}
          options={allCities}
        />
        <TextField
          id="address-from"
          label={t('form.addressFrom')}
          value={addressFrom}
          onChange={setAddressFrom}
          hint={t('form.addressFromHint')}
        />
        <SelectField
          id="city-to"
          label={t('form.to')}
          required
          value={effectiveCityTo}
          onChange={setCityTo}
          options={allCities}
        />
        <TextField
          id="address-to"
          label={t('form.addressTo')}
          value={addressTo}
          onChange={setAddressTo}
          hint={t('form.addressToHint')}
        />
      </fieldset>

      <fieldset className="form-page__fieldset">
        <legend className="form-page__legend">{t('form.personalSection')}</legend>

        <TextField
          id="full-name"
          label={t('form.fullName')}
          required
          value={fullName}
          onChange={setFullName}
          hint={t('form.fullNameHint')}
        />
        <PhoneListField label={t('form.phone')} values={phones} onChange={setPhones} required />
        <TextField id="email" label={t('form.email')} type="email" value={email} onChange={setEmail} hint={t('form.emailHint')} />
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
