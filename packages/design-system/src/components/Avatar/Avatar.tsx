import * as React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Fallback text shown when no image (initials). */
  fallback?: string;
  size?: AvatarSize;
  /** Tonal scheme. */
  tone?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = 'md', tone = 'primary', className, ...rest },
  ref,
) {
  return (
    <RadixAvatar.Root
      ref={ref}
      className={classNames('med-avatar', `med-avatar--size-${size}`, `med-avatar--tone-${tone}`, className)}
      {...rest}
    >
      <RadixAvatar.Image src={src} alt={alt ?? ''} className="med-avatar__image" />
      <RadixAvatar.Fallback className="med-avatar__fallback" delayMs={600}>
        {fallback ?? <Icon name="User" size="sm" aria-hidden="true" />}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
});

export { Avatar };
export default Avatar;