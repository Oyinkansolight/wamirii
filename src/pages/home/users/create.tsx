/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Card, Select, TextInput, TextInputProps } from 'flowbite-react';
import { useState } from 'react';
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/DashboardLayout';

import { roles } from '@/constant/generic';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

export default AuthGuardHOC(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
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
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
    {
      placeholder: '',
      title: 'Password',
      name: 'password',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
    {
      placeholder: '',
      title: 'Role',
      name: 'role',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const f = httpsCallable(getFunctions(), 'createUser', {});
      const r = await f(data);
      if ((r.data as any)?.errorInfo.message) {
        toast((r.data as any).errorInfo.message, { type: 'error' });
      } else {
        toast('User Created', { type: 'success' });
      }
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
          <div className=' font-bold'>Create User</div>
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
                {v.name === 'role' ? (
                  <Select
                    className='capitalize'
                    {...register((v.name ?? `${i}`) as keyof User, v.options)}
                  >
                    <option value=''>Select Role</option>
                    {roles.map((role, i) => (
                      <option
                        key={i}
                        value={role.toLowerCase()}
                        className='capitalize'
                      >
                        {role.toLowerCase()}
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
          Create User
        </Button>
      </form>
    </DashboardLayout>
  );
});
