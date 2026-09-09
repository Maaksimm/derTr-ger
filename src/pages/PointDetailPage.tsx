import { Link, useParams } from 'react-router-dom';
import { usePoint } from '../hooks/usePoint';
import { useLanguage } from '../i18n/LanguageContext';
import './PointDetailPage.css';

export function PointDetailPage() {
  const { t } = useLanguage();
  const { pointId } = useParams<{ pointId: string }>();
  const { point, loading } = usePoint(pointId);

  if (loading) {
    return (
      <main className="point-detail">
        <p>{t('common.loading')}</p>
      </main>
    );
  }

  if (!point) {
    return (
      <main className="point-detail">
        <h1>{t('points.notFound')}</h1>
        <p>{t('points.notFoundHint')}</p>
        <Link to="/points" className="point-detail__back">
          {t('points.backToList')}
        </Link>
      </main>
    );
  }

  return (
    <main className="point-detail">
      <Link to="/points" className="point-detail__back">
        ← {t('points.backToList')}
      </Link>

      <span className="point-detail__type">{point.type}</span>
      <h1 className="point-detail__title">{point.title}</h1>

      <dl className="point-detail__fields">
        <div>
          <dt>{t('points.country')}</dt>
          <dd>{point.country}</dd>
        </div>
        <div>
          <dt>{t('points.address')}</dt>
          <dd>
            <a href={point.mapsUrl} target="_blank" rel="noopener noreferrer">
              {point.address}
            </a>
          </dd>
        </div>
        <div>
          <dt>{t('points.description')}</dt>
          <dd>{point.description}</dd>
        </div>
        <div>
          <dt>Google Maps</dt>
          <dd>
            <a href={point.mapsUrl} target="_blank" rel="noopener noreferrer">
              {point.mapsUrl}
            </a>
          </dd>
        </div>
        <div>
          <dt>{t('points.deliveryTitle')}</dt>
          <dd className={point.addressDeliveryAvailable ? 'point-detail__yes' : ''}>
            {point.addressDeliveryAvailable ? t('points.deliveryYes') : t('points.deliveryNo')}
          </dd>
        </div>
      </dl>
    </main>
  );
}
