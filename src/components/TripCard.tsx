import { Link } from 'react-router-dom';
import type { Trip } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { RouteTimeline } from './RouteTimeline';
import { StatusBadge } from './StatusBadge';
import './TripCard.css';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const { t } = useLanguage();
  const { passengers } = trip;

  return (
    <article className="trip-card">
      <header className="trip-card__head">
        <div className="trip-card__id">
          <span className="trip-card__number">#{trip.number}</span>
          <StatusBadge status={trip.status} />
        </div>
        <div className="trip-card__route-label">{trip.routeLabel}</div>
      </header>

      <div className="trip-card__meta">
        <span>
          {trip.car.color} {trip.car.name}
        </span>
        <span className="trip-card__divider" aria-hidden="true" />
        <span>{trip.drivers.join(', ')}</span>
      </div>

      <RouteTimeline stops={trip.stops} />

      <footer className="trip-card__footer">
        <div className="trip-card__capacity">
          {passengers.isFull ? (
            <div className="trip-card__capacity-block">
              <span className="trip-card__capacity-label trip-card__capacity-label--full">
                {t('trips.allFull')}
              </span>
              <Link to={`/trip/${trip.id}/passenger`} className="trip-card__btn trip-card__btn--ghost">
                {t('common.joinQueue')}
              </Link>
            </div>
          ) : (
            <div className="trip-card__capacity-block">
              <span className="trip-card__capacity-label">
                {t('trips.freeSeats')}: <b>{passengers.freeSeats}</b> · {t('trips.applications')}{' '}
                {passengers.applied}
              </span>
              <Link to={`/trip/${trip.id}/passenger`} className="trip-card__btn">
                {t('common.orderTrip')}
              </Link>
            </div>
          )}

          <div className="trip-card__capacity-block">
            <span className="trip-card__capacity-label">
              {t('trips.packageCapacity')}: <b>{trip.packageCapacityKg} кг</b>
            </span>
            <Link to={`/trip/${trip.id}/package`} className="trip-card__btn trip-card__btn--outline">
              {t('common.orderPackage')}
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
