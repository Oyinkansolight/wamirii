import clsxm from '@/lib/clsxm';

export default function Role({ role }: { role: string }) {
  const c = () => {
    switch (role) {
      case 'active':
        return 'bg-[#E9FAF0] text-[#13602C]';
      case 'inactive':
        return 'bg-[#FFECEF] text-[#FE464B]';
      case 'pending':
        return 'bg-[#FFA51E] text-[#FFF8E8]';
      default:
        return '';
    }
  };

  return (
    <div className={clsxm('rounded-full bg-gray-100 px-4 py-1', c())}>
      {role}
    </div>
  );
}
