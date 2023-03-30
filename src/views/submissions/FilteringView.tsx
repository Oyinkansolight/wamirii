import { Select, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

export default function FilteringView() {
  const { handleSubmit, register } = useForm({ mode: 'onChange' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    logger(data);
  };
  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-y-2 text-start'>
        <div className='rounded-md bg-white p-3 shadow-md'>
          <div>Gender</div>
          <Select {...register('missingGender')}>
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
      <Button className='px-12'>Apply</Button>
    </form>
  );
}
