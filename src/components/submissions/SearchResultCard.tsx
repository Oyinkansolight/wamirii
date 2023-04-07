import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import { StorageService } from '@/firebase/storage/storage-service';

import { SearchHit } from '@/types/search-result';

export default function SearchResultCard({ hit }: { hit: SearchHit }) {
  const [url] = useDownloadURL(StorageService.getRef(hit.missingImageUrl));
  const router = useRouter();
  return (
    <div
      className='flex cursor-pointer gap-4 p-2 text-xs hover:bg-blue-200'
      onClick={() => router.push(`/submissions/${hit.objectID}`)}
    >
      <div style={{ height: '48px', width: '48px', position: 'relative' }}>
        {url && (
          <Image
            fill
            src={url}
            alt='missing_person_avatar'
            className='overflow-hidden rounded-full object-cover'
          />
        )}
      </div>
      <div>
        <div className=' font-bold capitalize'>
          {hit.missingLastName?.toLocaleLowerCase()}{' '}
          {hit.missingFirstName?.toLocaleLowerCase()}
        </div>
        <div className='flex items-center'>
          <div>{hit.missingAge}</div>
          <div className=' -full mx-1 h-1 w-1 rounded bg-gray-500' />
          <div>{hit.missingLastSeenSate}</div>
          <div className=' -full mx-1 h-1 w-1 rounded bg-gray-500' />
          {hit.missingSince && (
            <div>Since-{new Date(hit.missingSince).toDateString()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
