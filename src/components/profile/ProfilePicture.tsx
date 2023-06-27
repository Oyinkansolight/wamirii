import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import clsxm from '@/lib/clsxm';

import { StorageService } from '@/firebase/storage/storage-service';

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
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [url, loading, error] = useDownloadURL(
    StorageService.getRef(user?.imageURL ? `${user?.imageURL}` : undefined)
  );
  const avatar = createAvatar(thumbs, {
    seed: user?.username ?? '',
    radius: 50,
    // fontFamily: ['Arial'],
  });
  return (
    <div
      style={{ position: 'relative', height: `${size}px`, width: `${size}px` }}
    >
      {user?.imageURL && !url ? (
        <div />
      ) : (
        <Image
          fill
          className={clsxm(
            'overflow-hidden rounded-full object-cover',
            className
          )}
          src={
            url ??
            `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`
          }
          alt='avatar'
        />
      )}
    </div>
  );
}
