import { BsSearch } from 'react-icons/bs';

export default function TableSearchInput() {
  return (
    <div>
      <div className='relative'>
        <input
          type='search'
          id='search'
          className=' block w-full rounded-lg border-none bg-gray-100 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          placeholder='Search'
          required
        />
        <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3'>
          <BsSearch />
        </div>
      </div>
    </div>
  );
}
