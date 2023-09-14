import {
  FileInput,
  Select,
  Textarea,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { IoCaretBackOutline } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import ImagePicker from '@/components/inputs/image-picker';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import ActionFailedView from '@/components/modal-views/ActionFailed';
import ActionSuccessView from '@/components/modal-views/ActionSuccess';
import DeleteSubmissionView from '@/components/modal-views/DeleteSubmissionView';

import {
  allStates,
  channel,
  reporterRelationship,
  status,
} from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Listing, toLocalListings } from '@/types/listing';
import { Role } from '@/types/user';

const missingPersonInputProps: (TextInputProps & { roles?: Role[] } & {
  options?: RegisterOptions<FieldValues, string> | undefined;
})[] = [
  {
    placeholder: 'Enter first name of missing person',
    title: 'First name',
    name: 'missingFirstName',
    //required: true,
    //options: {
    //  validate: {
    //    notEmpty: (v) => v !== '' || 'This field must not be empty',
    //  },
    //},
  },
  {
    placeholder: 'Enter last name of missing person',
    title: 'Last name',
    name: 'missingLastName',
    //required: true,
    //options: {
    //  validate: {
    //    notEmpty: (v) => v !== '' || 'This field must not be empty',
    //  },
    //},
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
    //options: {
    //  validate: {
    //    notEmpty: (v) => v !== '' || 'This field must not be empty',
    //  },
    //},
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
    placeholder: 'Last Actual Location(Bus Stop, Workplace, Address, e.t.c)',
    title: 'Last Actual Location',
    name: 'missingLastKnownLocation',
    required: false,
  },
  {
    placeholder: "Reporter's relationship with victim'",
    title: 'Relationship with victim',
    name: 'missingReporterRelationship',
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
    placeholder:
      'Additional Information (Physical feature, tribe, complextion e.t.c)',
    title: 'Additional Information',
    name: 'missingMoreInformation',
  },
];

const contactPersonInputProps: (TextInputProps & { roles?: Role[] } & {
  options?: RegisterOptions<FieldValues, string> | undefined;
})[] = [
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
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
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
  {
    placeholder: 'Enter Channel',
    title: 'Channel',
    name: 'channel',
    roles: ['volunteer', 'manager', 'admin'],
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== 'select' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: 'Channel Info (username, phone number, link e.t.c)',
    title: 'Channel Info',
    name: 'channelInfo',
    roles: ['volunteer', 'manager', 'admin'],
    required: true,
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const router = useRouter();
  const { id, mode } = router.query;
  const [submissionDoc, , error] = useDocument(
    id ? FirestoreService.getDocRef(`listings/${id}`) : undefined,
    {}
  );
  const submission = useMemo(
    () => ({ _id: id as string, ...submissionDoc?.data() } as Listing),
    [id, submissionDoc]
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (mode) {
      setIsEditing(mode === 'edit');
    }
  }, [mode]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [, setIsSubmitting] = useState(false);
  const generalModal = useContext(GeneralModalContext);

  const handleDelete = async () => {
    if (generalModal) {
      generalModal.setContent(
        <DeleteSubmissionView
          submission={{ _id: id as string, ...submission }}
        />
      );
      generalModal.setIsOpen(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      for (let i = 0; i < Object.keys(data).length; i++) {
        const key = Object.keys(data)[i];
        if (
          data[key] === '' ||
          typeof data[key] === 'undefined' ||
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
      if (generalModal?.setContent) {
        generalModal.setContent(
          <ActionSuccessView
            onClose={() => generalModal.setIsOpen(false)}
            title='Submission Updated'
            subtitle=''
          />
        );
        generalModal.setIsOpen(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (generalModal?.setContent) {
        generalModal.setContent(
          <ActionFailedView
            onClose={() => generalModal.setIsOpen(false)}
            tryAgain={() => {
              generalModal.setIsOpen(false);
              onSubmit(getValues());
            }}
            title='Submission Failed'
            subtitle={error.message}
          />
        );
        generalModal.setIsOpen(true);
      }
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
        {(error || (submissionDoc && !submissionDoc?.exists())) && (
          <div
            className='mb-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            <div>
              <span className='font-medium'>Error!</span>{' '}
              {error
                ? error.message
                : !submissionDoc?.exists()
                ? 'This submission does not exist'
                : 'Unknown Error'}
            </div>
          </div>
        )}
        <div className='flex flex-col items-start justify-between gap-4 xl:flex-row'>
          <div>
            <div
              onClick={() => router.back()}
              className='mb-4 flex cursor-pointer items-center gap-2'
            >
              <IoCaretBackOutline className='text-[#819289]' />
              <div>Back</div>
            </div>
            <div className='text-2xl font-extrabold md:text-3xl'>
              {isEditing ? 'Edit' : 'View'} Submission
            </div>
          </div>
          {isEditing ? (
            <Button type='submit'>Submit</Button>
          ) : (
            <div className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                className='border-red-500 text-red-500 hover:bg-red-200'
                onClick={handleDelete}
              >
                Delete Submission
              </Button>
              <Button
                type='button'
                onClick={() => setIsEditing(true)}
                variant='outline'
              >
                Edit Information
              </Button>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4 xl:flex-row'>
          <div className='flex-1 rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4'>
            <div className='text-lg font-bold lg:text-xl'>
              Missing Person Information
            </div>
            <div className='py-6'>
              <Controller
                name='missingImageUrl'
                control={control}
                render={(field) => (
                  <ImagePicker
                    initialImage={submission?.missingImageUrl}
                    onChange={field.field.onChange}
                  />
                )}
              />
            </div>
            <div className='grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2'>
              {missingPersonInputProps.map((v, i) => (
                <div
                  className={clsxm([
                    'w-full flex-1 lg:min-w-[15rem]',
                    v.name === 'missingMoreInformation' &&
                      'flex-initial  lg:col-span-2',
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
                    {v.required && <span className='text-red-500'>*</span>}
                  </label>
                  {v.name === 'missingImageUrl' ? (
                    <FileInput
                      id={v.name}
                      placeholder={v.placeholder}
                      accept='image/png, image/gif, image/jpeg'
                      {...register(v.name ?? `${i}`)}
                    />
                  ) : v.name === 'missingReporterRelationship' ? (
                    <Select
                      disabled={!isEditing}
                      className='capitalize'
                      {...register(v.name, v.options)}
                    >
                      <option value='select'>
                        Select Relationship with Missing person
                      </option>
                      {reporterRelationship.map((relationship, i) => {
                        return (
                          <option key={i} value={relationship}>
                            {relationship}
                          </option>
                        );
                      })}
                    </Select>
                  ) : v.name === 'status' ? (
                    <Select
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                        disabled={!isEditing}
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
                      disabled={!isEditing}
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
          <div className='w-full rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4 xl:max-w-sm'>
            <div className='mb-2 text-lg font-bold md:text-xl'>
              Contact Information{' '}
              <span className='text-[#819289]'>(If Found)</span>
            </div>
            <div className='flex flex-col gap-y-6'>
              {contactPersonInputProps
                .filter(
                  (v) => !v.roles || v.roles.includes(user?.role ?? 'user')
                )
                .map((v, i) => (
                  <div className='min-w-[15rem] flex-1' key={i}>
                    <label htmlFor={`${i}`} className='text-[#819289]'>
                      {v.title}
                      {v.required && <span className='text-red-500'>*</span>}
                    </label>
                    {v.name === 'channel' ? (
                      <Select
                        disabled={!isEditing}
                        key={i}
                        className='capitalize'
                        {...register(v.name, v.options)}
                      >
                        <option value='select'>Select Channel</option>
                        {channel.map((channel, i) => {
                          return (
                            <option key={i} value={channel}>
                              {channel}
                            </option>
                          );
                        })}
                      </Select>
                    ) : (
                      <TextInput
                        disabled={!isEditing}
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
        </div>
      </form>
    </DashboardLayout2>
  );
}, ['admin', 'manager']);
