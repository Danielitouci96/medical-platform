import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Whether the tag is removable. */
  removable?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  icon?: IconName;
  size?: 'sm' | 'md';
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { removable, onRemove, removeLabel = 'Remove', icon, size = 'md', tone = 'neutral', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={classNames(
        'med-tag',
        `med-tag--size-${size}`,
        `med-tag--tone-${tone}`,
        removable && 'med-tag--removable',
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size="xs" aria-hidden="true" /> : null}
      <span className="med-tag__label">{children}</span>
      {removable ? (
        <button
          type="button"
          className="med-tag__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <Icon name="X" size="xs" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
});

export { Tag };
export default Tag;