import * as React from 'react';
import classNames from 'classnames';
import { IconButton } from '../IconButton/IconButton';

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selectedDate?: Date;
  /** Range selection. */
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onSelect?: (date: Date) => void;
  /** Number of weeks to show. */
  weeks?: number;
  disabledDates?: (date: Date) => boolean;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function isSameDay(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    selectedDate,
    rangeStart,
    rangeEnd,
    onSelect,
    weeks = 6,
    disabledDates,
    className,
    ...rest
  },
  ref,
) {
  const today = startOfDay(new Date());
  const [viewMonth, setViewMonth] = React.useState(() => {
    const base = selectedDate ?? rangeStart ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  // Sync view when selectedDate changes externally.
  React.useEffect(() => {
    const base = selectedDate ?? rangeStart;
    if (base) {
      setViewMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    }
  }, [selectedDate, rangeStart]);

  const firstDayOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startOfGrid = new Date(firstDayOfMonth);
  startOfGrid.setDate(1 - firstDayOfMonth.getDay());

  const days: Date[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(startOfGrid);
    d.setDate(startOfGrid.getDate() + i);
    days.push(d);
  }

  const goPrev = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const goNext = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  return (
    <div ref={ref} className={classNames('med-calendar', className)} {...rest}>
      <div className="med-calendar__header">
        <IconButton icon="ChevronLeft" aria-label="Previous month" size="sm" variant="ghost" onClick={goPrev} />
        <span className="med-calendar__title">
          {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </span>
        <IconButton icon="ChevronRight" aria-label="Next month" size="sm" variant="ghost" onClick={goNext} />
      </div>

      <div className="med-calendar__weekdays" role="row">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="med-calendar__weekday" role="columnheader" aria-label={d}>
            {d}
          </div>
        ))}
      </div>

      <div className="med-calendar__grid" role="grid">
        {days.map((date, i) => {
          const inMonth = date.getMonth() === viewMonth.getMonth();
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          const inRange =
            rangeStart && rangeEnd && date >= startOfDay(rangeStart) && date <= startOfDay(rangeEnd);
          const isStart = isSameDay(date, rangeStart);
          const isEnd = isSameDay(date, rangeEnd);
          const disabled = disabledDates?.(date) ?? false;

          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              tabIndex={isToday || (i === 0 && inMonth) ? 0 : -1}
              disabled={disabled}
              onClick={() => onSelect?.(date)}
              aria-pressed={isSelected}
              aria-selected={isSelected || isStart || isEnd}
              className={classNames(
                'med-calendar__day',
                !inMonth && 'med-calendar__day--outside',
                isToday && !isSelected && 'med-calendar__day--today',
                (isSelected || isStart || isEnd) && 'med-calendar__day--selected',
                inRange && 'med-calendar__day--in-range',
              )}
            >
              {isStart ? (
                <span className="med-calendar__range-label">Start</span>
              ) : isEnd ? (
                <span className="med-calendar__range-label">End</span>
              ) : (
                date.getDate()
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export { Calendar };
export default Calendar;