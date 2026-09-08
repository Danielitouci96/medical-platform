import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';
import { Button } from '../Button/Button';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: ModalSize;
  /** Hide the close button (for required confirmations). */
  hideCloseButton?: boolean;
  /** Render the footer. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** Applied to the portal content. */
  contentClassName?: string;
}

const sizeClass: Record<ModalSize, string> = {
  xs: 'med-modal__content--xs',
  sm: 'med-modal__content--sm',
  md: 'med-modal__content--md',
  lg: 'med-modal__content--lg',
  xl: 'med-modal__content--xl',
};

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onOpenChange,
    title,
    description,
    size = 'md',
    hideCloseButton,
    footer,
    children,
    className,
    contentClassName,
  },
  ref,
) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="med-modal__overlay" />
        <RadixDialog.Content
          ref={ref}
          className={classNames('med-modal__content', sizeClass[size], contentClassName, className)}
        >
          {(!hideCloseButton && title === undefined) ? (
            <RadixDialog.Close asChild>
              <IconButtonClose />
            </RadixDialog.Close>
          ) : null}
          {title !== undefined ? (
            <div className="med-modal__header">
              <div className="med-modal__heading">
                <RadixDialog.Title className="med-modal__title">{title}</RadixDialog.Title>
                {description ? (
                  <RadixDialog.Description className="med-modal__description">
                    {description}
                  </RadixDialog.Description>
                ) : null}
              </div>
              {!hideCloseButton ? (
                <RadixDialog.Close asChild>
                  <IconButtonClose />
                </RadixDialog.Close>
              ) : null}
            </div>
          ) : null}
          {children ? <div className="med-modal__body">{children}</div> : null}
          {footer ? <div className="med-modal__footer">{footer}</div> : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});

function IconButtonClose() {
  return (
    <button type="button" className="med-modal__close" aria-label="Close">
      <Icon name="X" size="sm" aria-hidden="true" />
    </button>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  loading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(function ConfirmDialog(
  {
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    tone = 'default',
    loading,
    onConfirm,
    onCancel,
  },
  ref,
) {
  return (
    <Modal
      ref={ref}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={() => { onCancel?.(); onOpenChange(false); }}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            loading={loading}
            onClick={() => onConfirm?.()}
          >
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
});

export { Modal, ConfirmDialog };
export default Modal;