import clsxm from '@/lib/clsxm';

export default function TabBar({
  currentIdx,
  onChange,
  items,
  className,
  activeItemClassName,
  inactiveItemClassName,
}: {
  items: { label: string; icon?: JSX.Element }[];
  currentIdx: number;
  onChange: (idx: number) => void;
  className?: string;
  activeItemClassName?: string;
  inactiveItemClassName?: string;
}) {
  return (
    <div
      className={clsxm(
        'flex min-h-[48px] overflow-hidden overflow-x-auto',
        className
      )}
    >
      {items.map((v, i) => (
        <div
          key={i}
          onClick={() => onChange(i)}
          className={clsxm(
            'flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-b-2 border-[#13602C1A] px-2 lg:min-w-[15rem] lg:px-0',
            currentIdx === i && 'border-primary font-bold text-primary',
            currentIdx === i ? activeItemClassName : inactiveItemClassName
          )}
        >
          {v.icon}
          <div>{v.label}</div>
        </div>
      ))}
      <div className='flex-1 border-b-2 border-[#13602C1A]' />
    </div>
  );
}
