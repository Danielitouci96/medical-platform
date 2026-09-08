import * as React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
  /** Show a close button in the content header. */
  closeable?: boolean;
  title?: React.ReactNode;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    trigger,
    children,
    open,
    onOpenChange,
    align = 'center',
    side = 'bottom',
    sideOffset = 8,
    contentClassName,
    closeable,
    title,
  },
  ref,
) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          ref={ref}
          className={classNames('med-popover', contentClassName)}
          align={align}
          side={side}
          sideOffset={sideOffset}
        >
          {title || closeable ? (
            <div className="med-popover__header">
              {title ? <div className="med-popover__title">{title}</div> : <span />}
              {closeable ? (
                <RadixPopover.Close asChild>
                  <button type="button" className="med-popover__close" aria-label="Close">
                    <Icon name="X" size="xs" aria-hidden="true" />
                  </button>
                </RadixPopover.Close>
              ) : null}
            </div>
          ) : null}
          {children}
          <RadixPopover.Arrow className="med-popover__arrow" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
});

export { Popover };
export default Popover;