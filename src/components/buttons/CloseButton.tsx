import { IoMdClose } from 'react-icons/io';

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer rounded-full bg-[#D2E1D7] p-1 text-[#042614]'
    >
      <IoMdClose />
    </div>
  );
}
