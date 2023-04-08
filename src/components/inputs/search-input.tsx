export default function SearchInput({
  onChange,
  onSubmit,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
  onSubmit?: () => void;
}) {
  return (
    <form
      className='w-full'
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
    >
      <label
        htmlFor='default-search'
        className='sr-only mb-2 text-sm font-medium text-gray-900 '
      >
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-gray-500 '
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => {
            onChange(e.currentTarget.value);
          }}
          value={value}
          type='search'
          id='default-search'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500      '
          placeholder='Search for name, location or age'
          required
        />
        <button
          type='submit'
          className='absolute right-2.5 bottom-2.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300   '
        >
          Search
        </button>
      </div>
    </form>
  );
}
