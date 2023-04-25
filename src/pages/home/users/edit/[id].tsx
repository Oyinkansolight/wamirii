import {
  Card,
  FileInput,
  Select,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfilePicture from '@/components/profile/ProfilePicture';

import { roles } from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

export default AuthGuardHOC(() => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useDocumentData<User>(
    id ? FirestoreService.getDocRef(`users/${id}`) : undefined
  );
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
          <div className=' font-bold'>Profile Information</div>
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
                ) : v.name === 'role' ? (
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
          Update
        </Button>
      </form>
    </DashboardLayout>
  );
}, ['admin']);
