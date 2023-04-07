import { Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';

import { Misc } from '@/misc/misc-functions';

import { FilterListings } from '@/types/filter-listings';

export default function FilteringView({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const d = Misc.queryStringToJSON<FilterListings>(router.asPath.split('?')[1]);
  const { handleSubmit, register } = useForm({
    mode: 'onChange',
    defaultValues: d,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i] as keyof FilterListings;
      if (data[key] === '') {
        data[key] = null;
      }
    }
    router.replace(router.pathname, {
      query: data,
    });
    onClose();
  };
  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex max-h-[30rem] flex-col gap-y-2 overflow-y-auto text-start'>
        <div className='rounded-md bg-white p-3 shadow-md'>
          <div>Gender</div>
          <Select {...register('missingGender')}>
            <option></option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Select>
        </div>
        <div className='rounded-md bg-white p-3 shadow-md'>
          <div>Age</div>
          <div className='flex gap-x-4'>
            <div className='flex-1'>
              <div>From Age</div>
              <TextInput type='number' {...register('ageFrom')} />
            </div>
            <div className='flex-1'>
              <div>To Age</div>
              <TextInput type='number' {...register('ageTo')} />
            </div>
          </div>
        </div>
        <div className='rounded-md bg-white p-3 shadow-md'>
          <div>Occupation</div>
          <TextInput {...register('missingOccupation')} />
        </div>
        <div className='rounded-md bg-white p-3 shadow-md'>
          <div>Missing Since</div>
          <div className='flex gap-x-4'>
            <div className='flex-1'>
              <div>From Date</div>
              <TextInput type='date' {...register('missingSinceFrom')} />
            </div>
            <div className='flex-1'>
              <div>To Date</div>
              <TextInput type='date' {...register('missingSinceTo')} />
            </div>
          </div>
        </div>
        <div className='rounded-md bg-white p-3 shadow-md'>
          <div>Date Reported</div>
          <div className='flex gap-x-4'>
            <div className='flex-1'>
              <div>From Date</div>
              <TextInput type='date' {...register('dateReportedFrom')} />
            </div>
            <div className='flex-1'>
              <div>To Date</div>
              <TextInput type='date' {...register('dateReportedTo')} />
            </div>
          </div>
        </div>
      </div>
      <div className='h-8' />
      <Button type='submit' className='px-12'>
        Apply
      </Button>
    </form>
  );
}
