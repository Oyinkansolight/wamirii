import clsxm from '@/lib/clsxm';

export default function TabBar({
  currentIdx,
  onChange,
  items,
}: {
  items: { label: string; icon?: JSX.Element }[];
  currentIdx: number;
  onChange: (idx: number) => void;
}) {
  return (
    <div className='flex overflow-hidden overflow-x-scroll'>
      {items.map((v, i) => (
        <div
          key={i}
          onClick={() => onChange(i)}
          className={clsxm(
            'flex h-12 min-w-[15rem] cursor-pointer items-center justify-center gap-2 border-b-2 border-[#13602C1A]',
            currentIdx === i && 'border-primary font-bold text-primary'
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
