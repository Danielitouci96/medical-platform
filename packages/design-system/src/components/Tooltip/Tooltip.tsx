import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import classNames from 'classnames';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  sideOffset?: number;
  /** Delay before showing (ms). */
  delayDuration?: number;
  className?: string;
  contentClassName?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, children, side = 'top', sideOffset = 6, delayDuration = 300, contentClassName },
  ref,
) {
  if (!React.isValidElement(children)) return <>{children}</>;

  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          ref={ref}
          className={classNames('med-tooltip', contentClassName)}
          side={side}
          sideOffset={sideOffset}
        >
          {content}
          <RadixTooltip.Arrow className="med-tooltip__arrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
});

export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

const TooltipProvider = ({ children, delayDuration }: TooltipProviderProps) => (
  <RadixTooltip.Provider delayDuration={delayDuration}>{children}</RadixTooltip.Provider>
);

export { Tooltip, TooltipProvider };
export default Tooltip;