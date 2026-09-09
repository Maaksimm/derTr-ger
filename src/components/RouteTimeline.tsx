import type { Stop } from '../types';
import './RouteTimeline.css';

interface RouteTimelineProps {
  stops: Stop[];
}

export function RouteTimeline({ stops }: RouteTimelineProps) {
  return (
    <ol className="route-timeline">
      {stops.map((stop, index) => {
        const isEdge = index === 0 || index === stops.length - 1;
        return (
          <li
            key={stop.id}
            className={
              'route-timeline__stop' +
              (isEdge ? ' route-timeline__stop--edge' : '') +
              (stop.isKeyStop ? ' route-timeline__stop--key' : '')
            }
          >
            <span className="route-timeline__dot" aria-hidden="true" />
            <span className="route-timeline__city">{stop.city}</span>
            <span className="route-timeline__time">{stop.time}</span>
          </li>
        );
      })}
    </ol>
  );
}
