import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** When active, highlights the button and shows a dot. */
  active?: boolean;
  /** Active filter count badge. */
  count?: number;
  icon?: IconName;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(function FilterButton(
  { active, count, icon = 'SlidersHorizontal', className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={active ?? undefined}
      className={classNames('med-filter-button', active && 'med-filter-button--active', className)}
      {...rest}
    >
      {icon ? <Icon name={icon} size="sm" aria-hidden="true" /> : null}
      {children}
      {typeof count === 'number' && count > 0 ? (
        <span className="med-filter-button__badge">{count}</span>
      ) : null}
    </button>
  );
});

export { FilterButton };
export default FilterButton;