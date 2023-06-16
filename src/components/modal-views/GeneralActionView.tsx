import Image from 'next/image';

export default function GeneralActionView({
  iconLink,
  actions,
  title,
  subtitle,
}: {
  iconLink: string;
  actions: JSX.Element;
  title: string;
  subtitle: string;
}) {
  return (
    <div className='flex flex-col items-center'>
      <Image width={256} height={256} src={iconLink} alt='failed-banner' />
      <div className='h-4' />
      <div className='text-2xl font-extrabold'>{title}</div>
      <div className='text-[#819289]'>{subtitle}</div>
      <div className='h-8' />
      {actions}
    </div>
  );
}
