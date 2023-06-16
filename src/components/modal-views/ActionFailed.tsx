import Image from 'next/image';

import Button from '@/components/buttons/Button';

export default function ActionFailedView({
  onClose,
  tryAgain,
  title,
  subtitle,
}: {
  onClose: () => void;
  tryAgain: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <div className='flex flex-col items-center'>
      <Image
        width={256}
        height={256}
        src='/images/failed.png'
        alt='failed-banner'
      />
      <div className='h-4' />
      <div className='text-2xl font-extrabold'>{title}</div>
      <div className='text-[#819289]'>{subtitle}</div>
      <div className='h-8' />

      <div className='flex items-center gap-4'>
        <Button
          className='min-w-[12rem] justify-center'
          onClick={() => {
            tryAgain();
          }}
        >
          <div>Try Again</div>
        </Button>
        <Button
          className='min-w-[12rem] justify-center'
          variant='outline'
          onClick={onClose}
        >
          <div>Close</div>
        </Button>
      </div>
    </div>
  );
}
