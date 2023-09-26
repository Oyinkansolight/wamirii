/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { TextInput, TextInputProps } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
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
import { UserContext } from '@/components/layout/GetAuthStatus';
import OrganizationSelector from '@/components/selectors/OrganizationSelector';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

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
      type: 'password',
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
      type: 'password',
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
      type: 'password',
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
  ],
  volunteer: [
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
    // {
    //   placeholder: '',
    //   title: 'Organization',
    //   name: 'organizationId',
    //   disabled: true,
    //   options: {
    //     validate: {
    //       notEmpty: (v) => v !== '' || 'This field must not be empty',
    //     },
    //   },
    // },
    {
      placeholder: '',
      title: 'Password',
      name: 'password',
      type: 'password',
      options: {
        validate: {
          notEmpty: (v) => v !== '' || 'This field must not be empty',
        },
      },
    },
  ],
};

export default function CreateUserView({
  role,
  onClose,
  userToEdit,
}: {
  role: Role;
  onClose?: () => void;
  userToEdit?: User;
}) {
  const user = useContext(UserContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const g = useContext(GeneralModalContext);

  useEffect(() => {
    if (user && user.role === 'manager') {
      setValue('organizationId', user.organizationId);
    }
  }, [setValue, user]);

  useEffect(() => {
    if (userToEdit) {
      const k = Object.keys(userToEdit) as (keyof User)[];
      for (let i = 0; i < k.length; i++) {
        const key = k[i];
        setValue(key, userToEdit[key]);
      }
    }
  }, [userToEdit, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (userToEdit) {
        delete data.password;
        await FirestoreService.updateUserDocument(data);
        toast.success(`User ${userToEdit.username} updated successfully`);
      } else {
        if (role !== 'organization') {
          const f = httpsCallable(getFunctions(), 'createUser', {});
          const r = await f({ ...data, role });
          if ((r.data as any)?.errorInfo?.message) {
            toast((r.data as any).errorInfo.message, { type: 'error' });
          } else {
            g?.success(`${role} created successfully`);
          }
        } else {
          await FirestoreService.createNewUserDocument(
            undefined,
            undefined,
            data.username,
            {
              acronym: data.acronym,
              role,
            }
          );
          g?.success('Organization created successfully!');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      g?.error(() => onSubmit(data), error.message);
    } finally {
      setIsSubmitting(false);
      onClose && onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-start'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='text-2xl font-bold'>
            {userToEdit ? `Edit ${role} Information` : `Add New ${role}`}
          </div>
          <div className='h-4' />
          <div className='max-w-[18rem] font-extralight'>
            {userToEdit
              ? `Edit the information below to add a edit ${role} information.`
              : `Complete the form below to add a new ${role} to the platform.`}
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
      <div className='flex flex-wrap justify-between gap-x-2 gap-y-6'>
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
                  'text-red-500 focus:outline-none'
              )}
            >
              {v.title}
            </label>
            <div className='h-2' />
            {v.name === 'organizationId' ? (
              <Controller
                control={control}
                render={({ field }) => (
                  <OrganizationSelector {...field} disabled={v.disabled} />
                )}
                name={v.name}
              />
            ) : (
              <TextInput
                id={v.name}
                type={v.type}
                disabled={
                  v.disabled ||
                  (v.type === 'password' && typeof userToEdit !== 'undefined')
                }
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
        {isSubmitting ? 'Loading' : userToEdit ? `Edit ${role}` : `Add ${role}`}
      </Button>
    </form>
  );
}
