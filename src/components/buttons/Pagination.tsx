import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export default function Pagination({
  nextPage,
  previousPage,
  pageNumber,
}: {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageNumber: number;
}) {
  return (
    <div className='flex items-center justify-center gap-4 font-bold'>
      <div
        onClick={previousPage}
        className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border'
      >
        <BiChevronLeft className='h-6 w-6' />
      </div>
      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white'>
        <div>{pageNumber}</div>
      </div>
      <div
        onClick={nextPage}
        className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border'
      >
        <BiChevronRight className='h-6 w-6' />
      </div>
    </div>
  );
}
