import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

export default function DashboardInfoCard({
  n,
  subText,
  percent,
  variant,
}: {
  n: number;
  subText: string;
  percent: number;
  variant: number;
}) {
  const variants = [
    {
      cardClassName: 'bg-[#1A7836] text-white',
      iconClassName: 'bg-[#13682C]',
      mainClassName: '',
      percentageClassName: '',
      subTextClassName: '',
    },
    {
      cardClassName: 'bg-[#FFF0F0]',
      iconClassName: 'bg-[#FFE5E5] text-[#FF8686]',
      mainClassName: '',
      percentageClassName: 'text-[#819289]',
      subTextClassName: '',
    },
    {
      cardClassName: 'bg-[#FFF9EB]',
      iconClassName: 'bg-[#FFF0CD] text-[#FBCB5D]',
      mainClassName: '',
      percentageClassName: 'text-[#819289]',
      subTextClassName: '',
    },
    {
      cardClassName: 'bg-[#EDF8F1]',
      iconClassName: 'bg-[#DBF3DB] text-[#042614]',
      mainClassName: '',
      percentageClassName: 'text-[#819289]',
      subTextClassName: '',
    },
  ];
  const use = variants[variant];
  return (
    <div
      className={clsxm(
        'flex h-[120px] w-[255px] flex-col items-center justify-center rounded-lg',
        use.cardClassName
      )}
    >
      <div className={clsxm('text-3xl font-bold', use.mainClassName)}>
        {n.toLocaleString()}
      </div>
      <div className={clsxm(use.subTextClassName)}>{subText}</div>
      <div className='h-2' />
      <div className='flex items-center'>
        <div className={clsxm('rounded p-px', use.iconClassName)}>
          {percent < 0 ? <FiArrowDownRight /> : <FiArrowUpRight />}
        </div>
        <div className={clsxm('text-sm', use.percentageClassName)}>
          {' '}
          {Math.abs(percent)}% {percent < 0 ? 'decrease' : 'increase'} from last
          month
        </div>
      </div>
    </div>
  );
}
