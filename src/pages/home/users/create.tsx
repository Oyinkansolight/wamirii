/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Card, TextInput, TextInputProps } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SelectCreateRoleModal from '@/components/modals/SelectCreateRoleModal';
import OrganizationSelector from '@/components/selectors/OrganizationSelector';

import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Role, User } from '@/types/user';

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
];

const organizationInputProps: (TextInputProps & {
  options?: RegisterOptions<FieldValues, string> | undefined;
})[] = [
  {
    placeholder: '',
    title: 'Organization Name',
    name: 'username',
    options: {
      validate: {
        notEmpty: (v) => v !== '' || 'This field must not be empty',
      },
    },
  },
  {
    placeholder: '',
    title: 'Acronym',
    name: 'acronym',
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
];

const managerInputProps: (TextInputProps & {
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
    title: 'Select Organization',
    name: 'organizationId',
    options: {
      validate: {
        notEmpty: (v) =>
          (v !== '' && v !== 'Select Organization') ||
          'This field must not be empty',
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
];

export default AuthGuardHOC(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const role = router.query['role'] as Role;
  const [inputProps, setInputProps] = useState(profileInputProps);

  useEffect(() => {
    switch (role) {
      case 'manager':
        setInputProps(managerInputProps);
        break;
      case 'organization':
        setInputProps(organizationInputProps);
        break;
      case 'volunteer':
        setInputProps(managerInputProps);
        break;
      default:
        setInputProps(profileInputProps);
        break;
    }
  }, [role]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const f = httpsCallable(getFunctions(), 'createUser', {});
      const r = await f({ ...data, role });
      if ((r.data as any)?.errorInfo?.message) {
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
      <SelectCreateRoleModal />
      <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div className=' font-bold capitalize'>Create {role}</div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
            {inputProps.map((v, i) => (
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
                {v.name === 'organizationId' ? (
                  <Controller
                    control={control}
                    render={({ field }) => <OrganizationSelector {...field} />}
                    name={v.name}
                  />
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
          Create {role}
        </Button>
      </form>
    </DashboardLayout>
  );
}, ['admin']);
