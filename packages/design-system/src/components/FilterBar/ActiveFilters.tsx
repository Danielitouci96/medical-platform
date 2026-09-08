import * as React from 'react';
import classNames from 'classnames';
import { Button } from '../Button/Button';

export interface ActiveFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  activeCount: number;
  onClearAll: () => void;
}

const ActiveFilters = React.forwardRef<HTMLDivElement, ActiveFiltersProps>(function ActiveFilters(
  { activeCount, onClearAll, className, children, ...rest },
  ref,
) {
  if (activeCount === 0) return null;

  return (
    <div ref={ref} className={classNames('med-active-filters', className)} {...rest}>
      <span className="med-active-filters__label">
        Active filters ({activeCount})
      </span>
      {children}
      <Button variant="link" size="sm" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
});

export { ActiveFilters };
export default ActiveFilters;