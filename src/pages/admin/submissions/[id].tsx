import {
  FileInput,
  Select,
  Textarea,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { IoCaretBackOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import ImagePicker from '@/components/inputs/image-picker';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { allStates, status } from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { Listing, toLocalListings } from '@/types/listing';

const missingPersonInputProps: (TextInputProps & {
  options?: RegisterOptions<FieldValues, string> | undefined;
})[] = [
  {
    placeholder: 'Enter first name of missing person',
    title: 'First name',
    name: 'missingFirstName',
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter last name of missing person',
    title: 'Last name',
    name: 'missingLastName',
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  // {
  //   placeholder: 'Select image of missing person',
  //   title: 'Image',
  //   name: 'missingImageUrl',
  // },
  {
    placeholder: 'Select gender of missing person',
    title: 'Gender',
    name: 'missingGender',
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== 'select' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter age of missing person',
    title: 'Age when last seen',
    name: 'missingAge',
    type: 'number',
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter the date the missing person was last seen',
    title: 'Missing Since',
    name: 'missingSince',
    required: true,
    type: 'date',
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
        notFuture: (v) =>
          new Date(v) < new Date() || 'Date must not be in the future',
      },
    },
  },
  {
    placeholder: 'Enter occupation of missing person',
    title: 'Occupation',
    name: 'missingOccupation',
  },
  {
    placeholder: 'Enter the state the missing person was last seen',
    title: 'Last Location (state)',
    name: 'missingLastSeenSate',
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== 'select' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: '',
    title: 'Status',
    name: 'status',
    options: {
      validate: {
        notEmpty: (v) => v !== 'select' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter more information about the missing person',
    title: 'More Information',
    name: 'missingMoreInformation',
  },
];

const contactPersonInputProps: TextInputProps[] = [
  {
    placeholder: 'Enter name of contact person',
    title: 'Name',
    name: 'contactName',
  },
  {
    placeholder: 'Enter email address of contact person',
    title: 'Email',
    name: 'contactEmail',
  },
  {
    placeholder: 'Enter phone number of contact person',
    title: 'Phone Number',
    name: 'contactPhone',
  },
  {
    placeholder: 'Enter address of contact person',
    title: 'Address',
    name: 'contactAddress',
  },
  {
    placeholder: 'Relationship to missing person',
    title: 'Relationship',
    name: 'contactRelationship',
  },
];

export default function ViewSubmission() {
  const user = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
  const [submission] = useDocumentData<Listing>(
    id ? FirestoreService.getDocRef(`listings/${id}`) : undefined
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      for (let i = 0; i < Object.keys(data).length; i++) {
        const key = Object.keys(data)[i];
        if (
          data[key] === '' ||
          (typeof data[key] === 'string' && data[key].split()[0] === 'Select')
        ) {
          data[key] = null;
        }
      }
      await FirestoreService.createListing(
        {
          createdBy: user?.id,
          ...data,
        },
        id as string
      );
      toast.success('Submission Updated');
      router.push('/home/view-submissions');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submission) {
      const keys = Object.keys(submission);
      const localSub = toLocalListings(submission);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] as keyof Listing;
        if (key === 'missingSince') {
          setValue(key, moment(localSub[key]).format('YYYY-MM-DD'));
        } else {
          setValue(key, localSub[key]);
        }
      }
    }
  }, [setValue, submission]);

  return (
    <DashboardLayout2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='layout flex h-screen flex-col gap-6'
      >
        <div className='flex items-start justify-between'>
          <div>
            <div className='mb-4 flex items-center gap-2'>
              <IoCaretBackOutline className='text-[#819289]' />
              <div>Back</div>
            </div>
            <div className='text-3xl font-extrabold'>View Submission</div>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              className='border-red-500 text-red-500 hover:bg-red-200'
            >
              Delete Submission
            </Button>
            <Button variant='outline'>Edit Information</Button>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='flex-1 rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4'>
            <div className='text-xl font-bold'>Missing Person Information</div>
            <div className='py-6'>
              <ImagePicker initialImage={submission?.missingImageUrl} />
            </div>
            <div className='grid grid-cols-2 gap-x-10 gap-y-6'>
              {missingPersonInputProps.map((v, i) => (
                <div
                  className={clsxm([
                    'min-w-[15rem] flex-1',
                    v.name === 'missingMoreInformation' &&
                      'col-span-2  flex-initial',
                  ])}
                  key={i}
                >
                  <label
                    htmlFor={v.name}
                    className={clsxm(
                      'text-[#819289]',
                      v.name &&
                        errors[v.name]?.message &&
                        ' text-red-500 focus:outline-none'
                    )}
                  >
                    {v.title}
                    {v.required && <span className='text-red-500'> * </span>}
                  </label>
                  {v.name === 'missingImageUrl' ? (
                    <FileInput
                      id={v.name}
                      placeholder={v.placeholder}
                      accept='image/png, image/gif, image/jpeg'
                      {...register(v.name ?? `${i}`)}
                    />
                  ) : v.name === 'status' ? (
                    <Select
                      className='capitalize'
                      {...register(v.name, v.options)}
                    >
                      <option value='select'>Select Status</option>
                      {status.map((status, i) => {
                        return (
                          <option key={i} value={status}>
                            {status}
                          </option>
                        );
                      })}
                    </Select>
                  ) : v.name === 'missingLastSeenSate' ? (
                    <Select
                      className='capitalize'
                      {...register(v.name, v.options)}
                    >
                      <option value='select'>Select State</option>
                      {allStates.map((state, i) => {
                        const parsedStateName =
                          state.name[0] + state.name.toLowerCase().slice(1);
                        return (
                          <option key={i} value={parsedStateName}>
                            {parsedStateName}
                          </option>
                        );
                      })}
                    </Select>
                  ) : v.name === 'missingGender' ? (
                    <Select
                      id={v.name}
                      placeholder={v.placeholder}
                      {...register(v.name, v.options)}
                    >
                      <option value='select'>Select Gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </Select>
                  ) : v.name === 'missingMoreInformation' ? (
                    <div>
                      <Textarea
                        id={v.name}
                        placeholder={v.placeholder}
                        {...register(v.name, v.options)}
                      />
                    </div>
                  ) : (
                    <TextInput
                      id={v.name}
                      type={v.type}
                      placeholder={v.placeholder}
                      {...register(v.name ?? `${i}`, v.options)}
                    />
                  )}
                  {v.name && errors[v.name]?.message && (
                    <div className='text-xs font-bold text-red-500'>
                      {errors[v.name]?.message?.toString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='w-full max-w-sm rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4'>
            <div className='text-xl font-bold'>
              Contact Information{' '}
              <span className='text-[#819289]'>(If Found)</span>
            </div>
            <div className='flex flex-col gap-y-6'>
              {contactPersonInputProps.map((v, i) => (
                <div className='min-w-[15rem] flex-1' key={i}>
                  <label htmlFor={`${i}`} className='text-[#819289]'>
                    {v.title}
                  </label>
                  <TextInput {...v} {...register(v.name ?? `${i}`)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout2>
  );
}
