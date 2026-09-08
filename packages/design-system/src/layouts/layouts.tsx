import * as React from 'react';
import classNames from 'classnames';
import { PageHeader as PageHeaderPattern } from '../patterns/patterns';

export interface PageProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical padding behaviour. */
  padded?: boolean;
  /** Maximum width. */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, className, padded = true, maxWidth = 'xl' },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        'med-page',
        padded && 'med-page--padded',
        maxWidth !== 'full' && `med-page--max-${maxWidth}`,
        className,
      )}
    >
      {children}
    </div>
  );
});

export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(props, ref) {
  return <PageHeaderPattern ref={ref} {...props} />;
});

const PageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function PageContent({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={classNames('med-page__content', className)} {...rest}>
        {children}
      </div>
    );
  },
);

export interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Ratio of left:right columns. */
  ratio?: '1-2' | '1-3' | '1-1' | '2-3';
  className?: string;
  /** Stack on small viewports. */
  responsive?: boolean;
}

const TwoColumnLayout = React.forwardRef<HTMLDivElement, TwoColumnLayoutProps>(function TwoColumnLayout(
  { left, right, ratio = '1-2', className, responsive = true },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        'med-two-column',
        `med-two-column--${ratio}`,
        responsive && 'med-two-column--responsive',
        className,
      )}
    >
      <div className="med-two-column__left">{left}</div>
      <div className="med-two-column__right">{right}</div>
    </div>
  );
});

export interface ThreeColumnLayoutProps {
  left?: React.ReactNode;
  center: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

const ThreeColumnLayout = React.forwardRef<HTMLDivElement, ThreeColumnLayoutProps>(function ThreeColumnLayout(
  { left, center, right, className },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-three-column', className)}>
      {left ? <div className="med-three-column__left">{left}</div> : null}
      <div className="med-three-column__center">{center}</div>
      {right ? <div className="med-three-column__right">{right}</div> : null}
    </div>
  );
});

export interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number | string;
  className?: string;
  /** Stack sidebar on top on small screens. */
  responsive?: boolean;
}

const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(function SidebarLayout(
  { sidebar, children, sidebarWidth = 260, className, responsive = true },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames('med-sidebar-layout', responsive && 'med-sidebar-layout--responsive', className)}
    >
      <div className="med-sidebar-layout__sidebar" style={{ width: typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth }}>
        {sidebar}
      </div>
      <div className="med-sidebar-layout__main">{children}</div>
    </div>
  );
});

export { Page, PageHeader, PageContent, TwoColumnLayout, ThreeColumnLayout, SidebarLayout };
export default Page;