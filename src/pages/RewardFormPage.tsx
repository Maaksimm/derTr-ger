import { useState } from 'react';
import { TextField } from '../components/form/fields';
import { ServiceFormPage } from '../components/form/ServiceFormPage';
import { useLanguage } from '../i18n/LanguageContext';
import { submitRewardSignup } from '../lib/api';

export function RewardFormPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitRewardSignup({ email });
      setSubmitted(true);
    } catch {
      setError(t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ServiceFormPage
      title={t('rewardform.title')}
      backTo="/reward"
      backLabel={t('rewardform.back')}
      submitted={submitted}
      successTitle={t('rewardform.successTitle')}
      successText={t('rewardform.successText', { email })}
      error={error}
      onSubmit={handleSubmit}
    >
      <TextField id="reward-email" label={t('form.email')} type="email" required value={email} onChange={setEmail} />
      <button type="submit" className="form-page__submit" disabled={submitting}>
        {t('common.send')}
      </button>
    </ServiceFormPage>
  );
}
