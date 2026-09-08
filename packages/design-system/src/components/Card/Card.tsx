import * as React from 'react';
import classNames from 'classnames';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat' | 'interactive';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Enables hover elevation (for interactive cards). */
  interactive?: boolean;
  /** Set when the whole card is clickable but not interactive-based. */
  as?: React.ElementType;
}

const paddingClass: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'med-card--pad-none',
  sm: 'med-card--pad-sm',
  md: 'med-card--pad-md',
  lg: 'med-card--pad-lg',
  xl: 'med-card--pad-xl',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', interactive, as: Comp = 'div', className, children, ...rest },
  ref,
) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Comp
      ref={ref as any}
      className={classNames(
        'med-card',
        `med-card--variant-${variant}`,
        paddingClass[padding],
        interactive && 'med-card--interactive',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render a divider under the header. */
  divider?: boolean;
  actions?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { divider, actions, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames('med-card__header', divider && 'med-card__header--divider', className)}
      {...rest}
    >
      <div className="med-card__header-content">{children}</div>
      {actions ? <div className="med-card__header-actions">{actions}</div> : null}
    </div>
  );
});

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as: Comp = 'h3', className, children, ...rest },
  ref,
) {
  return (
    <Comp ref={ref} className={classNames('med-card__title', className)} {...rest}>
      {children}
    </Comp>
  );
});

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, children, ...rest }, ref) {
    return (
      <p ref={ref} className={classNames('med-card__description', className)} {...rest}>
        {children}
      </p>
    );
  },
);

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={classNames('med-card__content', className)} {...rest}>
        {children}
      </div>
    );
  },
);

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={classNames('med-card__footer', className)} {...rest}>
        {children}
      </div>
    );
  },
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
export default Card;