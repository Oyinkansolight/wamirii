/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { TextInput, TextInputProps } from 'flowbite-react';
import { useContext, useState } from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import OrganizationSelector from '@/components/selectors/OrganizationSelector';

import { Role, User } from '@/types/user';

const allInputs: Record<
  Role,
  (TextInputProps & {
    options?: RegisterOptions<FieldValues, string> | undefined;
  })[]
> = {
  user: [
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
      title: 'Email Address',
      name: 'email',
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
      title: 'Password',
      name: 'password',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
  ],
  admin: [
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
      title: 'Email Address',
      name: 'email',
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
      title: 'Password',
      name: 'password',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
  ],
  manager: [
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
      title: 'Email Address',
      name: 'email',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
    {
      placeholder: '',
      title: 'Organization',
      name: 'organizationId',
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
  ],
  organization: [
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
  ],
  volunteer: [],
};

export default function CreateUserView({
  role,
  onClose,
}: {
  role: Role;
  onClose?: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const g = useContext(GeneralModalContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const f = httpsCallable(getFunctions(), 'createUser', {});
      const r = await f({ ...data, role });
      if ((r.data as any)?.errorInfo?.message) {
        toast((r.data as any).errorInfo.message, { type: 'error' });
      } else {
        g?.success(`${role} created successfully`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      g?.error(() => onSubmit(data), error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-start'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='text-xl font-bold'>Add New {role}</div>
          <div className='max-w-[18rem] font-extralight'>
            Complete the form below to add a new {role} to the platform.
          </div>
        </div>
        <div
          onClick={() => onClose && onClose()}
          className='cursor-pointer rounded-full bg-[#D2E1D7] p-1 text-[#042614]'
        >
          <IoMdClose />
        </div>
      </div>
      <div className='h-10' />
      <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
        {allInputs[role].map((v, i) => (
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
      <div className='h-10' />
      <Button
        disabled={isSubmitting}
        className='w-full justify-center py-3 capitalize'
        type='submit'
      >
        {isSubmitting ? 'Loading' : `Add ${role}`}
      </Button>
    </form>
  );
}
