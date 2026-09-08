import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'soft' | 'outlined' | 'solid';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  variant?: AlertVariant;
  title?: React.ReactNode;
  /** Typically includes the icon; defaults to a tone-appropriate icon. */
  icon?: IconName | null;
  /** Called when the alert is dismissed (renders a close button). */
  onDismiss?: () => void;
  dismissLabel?: string;
  /** Explicit ARIA role (defaults to alert for error, status otherwise). */
  role?: 'alert' | 'status';
}

const toneIcons: Record<AlertTone, IconName> = {
  info: 'Info',
  success: 'CheckCircle2',
  warning: 'AlertTriangle',
  error: 'AlertCircle',
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    tone = 'info',
    variant = 'soft',
    title,
    icon,
    onDismiss,
    dismissLabel = 'Dismiss alert',
    role,
    className,
    children,
    ...rest
  },
  ref,
) {
  const iconName = icon === null ? undefined : (icon ?? toneIcons[tone]);
  const resolvedRole = role ?? (tone === 'error' ? 'alert' : 'status');

  return (
    <div
      ref={ref}
      role={resolvedRole}
      className={classNames(
        'med-alert',
        `med-alert--tone-${tone}`,
        `med-alert--variant-${variant}`,
        className,
      )}
      {...rest}
    >
      {iconName ? (
        <div className="med-alert__icon">
          <Icon name={iconName} size="md" aria-hidden="true" />
        </div>
      ) : null}
      <div className="med-alert__body">
        {title ? <div className="med-alert__title">{title}</div> : null}
        {children ? <div className="med-alert__content">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button type="button" className="med-alert__dismiss" onClick={onDismiss} aria-label={dismissLabel}>
          <Icon name="X" size="sm" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

export { Alert };
export default Alert;