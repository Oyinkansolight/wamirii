import {
  Alert,
  FileInput,
  Select,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import { UserContext } from '@/components/layout/GetAuthStatus';
import ProfilePicture from '@/components/profile/ProfilePicture';

import { allStates } from '@/constant/generic';
import { AuthService } from '@/firebase/auth/auth-service';
import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { User } from '@/types/user';

export default function SettingsView() {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='layout flex h-screen flex-col gap-6'>
      <div>
        <div className='text-3xl font-extrabold'>Settings</div>
        <div className='font-light text-[#819289]'>
          Manage and personalize your account settings and profile here now
        </div>
      </div>
      <div className='flex gap-8'>
        <div className='flex w-56 flex-col gap-6'>
          <div
            className={clsxm(
              'cursor-pointer rounded-md px-3 py-1.5 text-center',
              tabIdx === 0 && 'bg-[#EEFDF4] font-bold text-primary'
            )}
            onClick={() => setTabIdx(0)}
          >
            Profile Information
          </div>
          <div
            className={clsxm(
              'cursor-pointer rounded-md px-3 py-1.5 text-center',
              tabIdx === 1 && 'bg-[#EEFDF4] font-bold text-primary'
            )}
            onClick={() => setTabIdx(1)}
          >
            Password and Security
          </div>
        </div>
        <div className='flex-1'>
          {tabIdx === 0 && <ProfileInformation />}
          {tabIdx === 1 && <PasswordAndSecurity />}
        </div>
      </div>
    </div>
  );
}

function ProfileInformation() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange', defaultValues: user ?? {} });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profileInputProps: (TextInputProps & {
    options?: RegisterOptions<FieldValues, string> | undefined;
  })[] = [
    {
      placeholder: '',
      title: 'Full Name',
      name: 'username',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
    {
      placeholder: '',
      title: 'Phone Number',
      name: 'phoneNumber',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
    {
      placeholder: '',
      title: 'Email',
      name: 'email',
      disabled: true,
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
  ];

  useEffect(() => {
    if (user) {
      const keys = Object.keys(user) as (keyof User)[];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        setValue(key, user[key]);
      }
    }
  }, [user, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      for (let i = 0; i < Object.keys(data).length; i++) {
        const key = Object.keys(data)[i];
        if (
          data[key] === '' ||
          (typeof data[key] === 'string' && data[key] === 'select')
        ) {
          data[key] = null;
        }
      }
      await FirestoreService.updateUserDocument(data);
      toast.success('Profile Updated');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-8 rounded-md border p-6'>
        <div className='flex items-start gap-4'>
          <ProfilePicture user={user} size={100} />
          <Button
            variant='outline'
            className='border-red-500 text-red-500 hover:bg-red-200 active:bg-red-300'
          >
            Delete Photo
          </Button>
          <label
            className='cursor-pointer rounded border border-primary px-3 py-1.5 text-primary hover:bg-primary-50'
            htmlFor='imageURL'
          >
            Upload New Image
          </label>
          <FileInput
            id='imageURL'
            accept='image/png, image/gif, image/jpeg'
            className='hidden'
            {...register('imageURL')}
          />
        </div>
        <div className='grid grid-cols-2 justify-between gap-4'>
          {profileInputProps.map((v, i) => (
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
                    errors[v.name as keyof User]?.message &&
                    ' text-red-500 focus:outline-none'
                )}
              >
                {v.title}
              </label>
              {v.name === 'missingLastSeenSate' ? (
                <Select className='capitalize'>
                  <option value=''>Select State</option>
                  {allStates.map((state, i) => (
                    <option
                      key={i}
                      value={state.name.toLowerCase()}
                      className='capitalize'
                    >
                      {state.name.toLowerCase()}
                    </option>
                  ))}
                </Select>
              ) : (
                <TextInput
                  id={v.name}
                  type={v.type}
                  disabled={v.disabled}
                  placeholder={v.placeholder}
                  {...register((v.name ?? `${i}`) as keyof User, v.options)}
                />
              )}
              {v.name && errors[v.name as keyof User]?.message && (
                <div className='text-xs font-bold text-red-500'>
                  {errors[v.name as keyof User]?.message?.toString()}
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          type='submit'
          isLoading={isSubmitting}
          className='w-full justify-center'
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

function PasswordAndSecurity() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, unused-imports/no-unused-vars
  const onSubmit = async (data: any) => {
    try {
      await AuthService.changePassword(
        data['oldPassword'],
        data['newPassword'],
        user?.email ?? ''
      );
      toast.success('Password Updated');
    } catch (error: unknown) {
      toast.error((error as { message: string }).message);
    }
    return;
  };
  return (
    <form className='rounded-md border p-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-8'>
        <div className='flex flex-col gap-2'>
          <label>Old Password</label>
          <TextInput
            id='oldPassword'
            type='password'
            placeholder='Enter your current password'
            {...register('oldPassword', {
              validate: {
                notEmpty: (v) => v !== '' || 'This field must not be empty',
              },
            })}
          />
          <ErrorView errorKey='oldPassword' errors={errors} />
        </div>
        <div className='flex flex-col gap-2'>
          <label>New Password</label>
          <TextInput
            id='newPassword'
            type='password'
            placeholder='Enter your new password'
            {...register('newPassword', {
              validate: {
                notEmpty: (v) => v !== '' || 'This field must not be empty',
              },
            })}
          />
          <ErrorView errorKey='newPassword' errors={errors} />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Re-Enter New Password</label>
          <TextInput
            id='_newPassword'
            type='password'
            placeholder='Enter your new password again'
            {...register('_newPassword', {
              validate: {
                notEmpty: (v) => v !== '' || 'This field must not be empty',
                notEqual: (v) =>
                  v === getValues('newPassword') ||
                  'Confirm password must be equal to password.',
              },
            })}
          />
          <ErrorView errorKey='_newPassword' errors={errors} />
        </div>
      </div>
      <div className='h-12' />
      <Button type='submit' className='w-full justify-center'>
        Reset Password
      </Button>
    </form>
  );
}

export function ErrorView({
  errors,
  errorKey,
}: {
  errors: FieldErrors<FieldValues>;
  errorKey: string;
}) {
  return errors[errorKey] ? (
    <Alert color='red'>{errors[errorKey]?.message?.toString()}</Alert>
  ) : (
    <div></div>
  );
}
