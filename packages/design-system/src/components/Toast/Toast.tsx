import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

const toneIcons: Record<ToastTone, IconName> = {
  info: 'Info',
  success: 'CheckCircle2',
  warning: 'AlertTriangle',
  error: 'AlertCircle',
};

export interface ToastProviderProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Provider> {
  children: React.ReactNode;
}

const ToastProvider = RadixToast.Provider;

export interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Viewport> {
  /** Position of the toast stack. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ToastViewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(function ToastViewport(
  { position = 'bottom-right', className, ...rest },
  ref,
) {
  return (
    <RadixToast.Viewport
      ref={ref}
      className={classNames('med-toast__viewport', `med-toast__viewport--${position}`, className)}
      {...rest}
    />
  );
});

export interface ToastProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixToast.Root>, 'title'> {
  tone?: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const Toast = React.forwardRef<HTMLLIElement, ToastProps>(function Toast(
  { tone = 'info', title, description, action, className, children, ...rest },
  ref,
) {
  const icon = toneIcons[tone];

  return (
    <RadixToast.Root
      ref={ref}
      className={classNames('med-toast', `med-toast--tone-${tone}`, className)}
      {...rest}
    >
      <div className="med-toast__icon">
        <Icon name={icon} size="md" aria-hidden="true" />
      </div>
      <div className="med-toast__body">
        {title ? (
          <RadixToast.Title className="med-toast__title">{title}</RadixToast.Title>
        ) : null}
        {description ? (
          <RadixToast.Description className="med-toast__description">{description}</RadixToast.Description>
        ) : null}
        {children}
      </div>
      {action ? <RadixToast.Action asChild altText="Toast action">{action}</RadixToast.Action> : null}
      <RadixToast.Close className="med-toast__close" aria-label="Dismiss">
        <Icon name="X" size="sm" aria-hidden="true" />
      </RadixToast.Close>
    </RadixToast.Root>
  );
});

export { ToastProvider, ToastViewport, Toast };
export default Toast;