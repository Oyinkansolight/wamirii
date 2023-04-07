import clsxm from '@/lib/clsxm';

export function GroupButton({
  buttons,
  onSelected,
  selected,
}: {
  selected: number;
  onSelected: (id: number) => void;
  buttons: { label: string }[];
}) {
  return (
    <div
      className='flex rounded-md border border-primary
  '
    >
      {buttons.map((button, i) => (
        <div
          key={i}
          className={clsxm([
            'flex-1 cursor-pointer px-8 py-2 transition-all',
            selected === i && 'bg-primary text-white',
          ])}
          onClick={() => onSelected(i)}
        >
          {button.label}
        </div>
      ))}
    </div>
  );
}
