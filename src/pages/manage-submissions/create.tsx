import {
  FileInput,
  Select,
  Textarea,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
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

import {
  allStates,
  channel,
  reporterRelationship,
  status,
} from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

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
];

const channelInputProps: (TextInputProps & { roles?: Role[] } & {
  options?: RegisterOptions<FieldValues, string> | undefined;
})[] = [
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
  const generalModal = useContext(GeneralModalContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
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
          (typeof data[key] === 'string' &&
            data[key].split()[0] === 'Select') ||
          typeof data[key] === 'undefined'
        ) {
          data[key] = null;
        }
      }
      //if (!data['missingImageUrl']) {
      //  toast.error('Please select an image to continue');
      //  return;
      //}
      const id = await FirestoreService.createListing({
        createdBy: user?.id,
        ...data,
        missingAge: data.missingAge ? Number.parseInt(data.missingAge) : null,
      });

      if (generalModal?.setContent) {
        generalModal.setContent(
          <ActionSuccessView
            onClose={() => {
              router.push(`/submissions/${id}`);
              generalModal?.setIsOpen(false);
            }}
            title='Submission Created'
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

  return (
    <DashboardLayout2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='layout flex h-screen flex-col gap-6'
      >
        <div className='flex items-start justify-between'>
          <div>
            <div
              onClick={() => router.back()}
              className='mb-4 flex cursor-pointer items-center gap-2'
            >
              <IoCaretBackOutline className='text-[#819289]' />
              <div>Back</div>
            </div>
            <div className='text-2xl font-extrabold md:text-3xl'>
              Add New Submission
            </div>
          </div>
          <Button type='submit'>Submit</Button>
        </div>
        <div className='flex flex-col gap-4 xl:flex-row'>
          <div className='flex-1 rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4'>
            <div className='text-lg font-bold md:text-xl'>
              Missing Person Information
            </div>
            <div className='py-6'>
              <Controller
                name='missingImageUrl'
                control={control}
                render={(field) => (
                  <ImagePicker onChange={field.field.onChange} />
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
          <div className='flex flex-col gap-4'>
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
            <div className='w-full rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4 xl:max-w-sm'>
              <div className='mb-2 text-lg font-bold md:text-xl'>
                Data Source
              </div>
              <div className='flex flex-col gap-y-6'>
                {channelInputProps
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
        </div>
      </form>
    </DashboardLayout2>
  );
}, ['admin', 'manager', 'volunteer', 'user', 'organization']);
