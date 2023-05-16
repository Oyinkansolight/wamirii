import {
  Card,
  FileInput,
  Select,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import ProfilePicture from '@/components/profile/ProfilePicture';
import Role from '@/components/profile/Role';

import { allStates } from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

export default AuthGuardHOC(() => {
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
      title: 'Email',
      name: 'email',
      disabled: true,
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
    {
      placeholder: 'Select profile picture',
      title: 'Image',
      name: 'imageURL',
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
    <DashboardLayout>
      <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className='flex flex-row items-center gap-2'>
            <div className='font-bold'>Profile Information</div>
            <span className='flex !max-w-[100px]'>
              <Role role={user?.role ?? ''} />
            </span>
          </div>
          <div>
            <ProfilePicture user={user} size={100} />
          </div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
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
                {v.name === 'imageURL' ? (
                  <FileInput
                    id={v.name}
                    accept='image/png, image/gif, image/jpeg'
                    placeholder={v.placeholder}
                    disabled={v.disabled}
                    {...register(v.name ?? (`${i}` as keyof User))}
                  />
                ) : v.name === 'missingLastSeenSate' ? (
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
        </Card>
        <Button
          type='submit'
          isLoading={isSubmitting}
          className='justify-center'
        >
          Update
        </Button>
      </form>
    </DashboardLayout>
  );
});
