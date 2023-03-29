import { Avatar } from 'flowbite-react';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import { StorageService } from '@/firebase/storage/storage-service';

import { Listing } from '@/types/listing';

export default function MissingAvatar({ listing }: { listing: Listing }) {
  const [url] = useDownloadURL(StorageService.getRef(listing.missingImageUrl));
  return <Avatar img={url} />;
}
