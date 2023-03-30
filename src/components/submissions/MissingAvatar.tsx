import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Avatar } from 'flowbite-react';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import { StorageService } from '@/firebase/storage/storage-service';

import { Listing } from '@/types/listing';

export default function MissingAvatar({ listing }: { listing: Listing }) {
  const [url] = useDownloadURL(StorageService.getRef(listing.missingImageUrl));
  const name =
    listing.missingFirstName || listing.missingLastName
      ? `${listing.missingLastName} ${listing.missingFirstName}`
      : listing._id;

  const avatar = createAvatar(initials, {
    seed: name ?? 'NO',
  });
  return (
    <Avatar
      img={
        url ??
        `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`
      }
    />
  );
}
