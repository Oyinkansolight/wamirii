import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';

import clsxm from '@/lib/clsxm';

import { User } from '@/types/user';

export default function ProfilePicture({
  user,
  className,
  size = 50,
}: {
  user?: User | null;
  size?: number;
  className?: string;
}) {
  const avatar = createAvatar(thumbs, {
    seed: user?.username ?? '',
    radius: 50,
  });
  return (
    <div
      style={{ position: 'relative', height: `${size}px`, width: `${size}px` }}
    >
      <Image
        fill
        className={clsxm(
          'overflow-hidden rounded-full object-cover',
          className
        )}
        src={
          user?.imageURLLink ??
          `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`
        }
        alt='avatar'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
    </div>
  );
}
