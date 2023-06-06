import Image from 'next/image';

import clsxm from '@/lib/clsxm';

export default function ListingFoundCard({
  img,
  name,
  gender,
  foundIn,
  age,
  className,
}: {
  img: string;
  name: string;
  gender: string;
  foundIn: string;
  age: number;
  className?: string;
}) {
  return (
    <div className={clsxm('flex opacity-40', className)}>
      <div>
        <Image src='/images/marker.png' alt='marker' height={48} width={48} />
      </div>
      <div
        className={clsxm(
          'flex items-center gap-3 rounded-lg bg-[#d9d9d9] py-2 pr-20 pl-2'
        )}
      >
        <div style={{ minWidth: '64px' }}>
          <Image
            className='overflow-hidden rounded-full object-cover'
            src={img}
            alt={img}
            height={64}
            width={64}
          />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='font-bold'>{name}</div>
          <div className='text-sm text-[#04261480]'>
            {gender} • {age} years
          </div>
          <div className='text-sm font-light'>Found in {foundIn}</div>
        </div>
      </div>
    </div>
  );
}
