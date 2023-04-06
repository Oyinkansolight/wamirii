import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import logger from '@/lib/logger';

import { StorageService } from '@/firebase/storage/storage-service';

import { User } from '@/types/user';

export default function ProfilePicture({
  user,
  size = 50,
}: {
  user?: User | null;
  size?: number;
}) {
  logger(user?.imageURL, 'imageURL');
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [url, loading, error] = useDownloadURL(
    StorageService.getRef(`${user?.imageURL}`)
  );
  logger(url, 'Actual URL');
  logger(error);
  const avatar = createAvatar(thumbs, {
    seed: user?.username ?? '',
    radius: 50,
    // fontFamily: ['Arial'],
  });
  return (
    <Image
      height={size}
      width={size}
      className='overflow-hidden rounded-full'
      src={
        url ??
        `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`
      }
      alt='avatar'
    />
  );
}
