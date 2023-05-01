import {
  Card,
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
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { allStates } from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Listing, toLocalListings } from '@/types/listing';

const missingPersonInputProps: (TextInputProps & {
  options?: RegisterOptions<FieldValues, string> | undefined;
})[] = [
  {
    placeholder: 'Enter first name of missing person',
    title: 'First name *',
    name: 'missingFirstName',
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter last name of missing person',
    title: 'Last name *',
    name: 'missingLastName',
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Select image of missing person',
    title: 'Image',
    name: 'missingImageUrl',
  },
  {
    placeholder: 'Select gender of missing person',
    title: 'Gender *',
    name: 'missingGender',
    options: {
      validate: {
        notEmpty: (v) => v !== 'select' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter age of missing person',
    title: 'Age when last seen *',
    name: 'missingAge',
    type: 'number',
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Enter the date the missing person was last seen',
    title: 'Missing Since *',
    name: 'missingSince',
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
    title: 'Last Location (state) *',
    name: 'missingLastSeenSate',
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

export default AuthGuardHOC(() => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  return (
    <DashboardLayout>
      <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className=' font-bold'>Missing Person Information</div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
            {missingPersonInputProps.map((v, i) => (
              <div
                className={clsxm([
                  'min-w-[15rem] flex-1',
                  v.name === 'missingMoreInformation' && 'w-full  flex-initial',
                ])}
                key={i}
              >
                <label
                  htmlFor={v.name}
                  className={clsxm(
                    v.name &&
                      errors[v.name]?.message &&
                      ' text-red-500 focus:outline-none'
                  )}
                >
                  {v.title}
                </label>
                {v.name === 'missingImageUrl' ? (
                  <FileInput
                    id={v.name}
                    placeholder={v.placeholder}
                    accept='image/png, image/gif, image/jpeg'
                    {...register(v.name ?? `${i}`)}
                  />
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
                  <Textarea
                    id={v.name}
                    placeholder={v.placeholder}
                    {...register(v.name, v.options)}
                  />
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
        </Card>
        <Card>
          <div className=' font-bold'>Contact Information (If found)</div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
            {contactPersonInputProps.map((v, i) => (
              <div className='min-w-[15rem] flex-1' key={i}>
                <label htmlFor={`${i}`} className=''>
                  {v.title}
                </label>
                <TextInput {...v} {...register(v.name ?? `${i}`)} />
              </div>
            ))}
          </div>
        </Card>
        <Button
          type='submit'
          isLoading={isSubmitting}
          className='justify-center'
        >
          Submit
        </Button>
      </form>
    </DashboardLayout>
  );
});
