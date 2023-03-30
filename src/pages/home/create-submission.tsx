import {
  Card,
  FileInput,
  Select,
  Textarea,
  TextInput,
  TextInputProps,
} from 'flowbite-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const missingPersonInputProps: (TextInputProps & {
    options?: RegisterOptions<FieldValues, string> | undefined;
  })[] = [
    {
      placeholder: 'Enter first name of missing person',
      title: 'First name',
      name: 'missing-first-name',
      options: { required: true },
    },
    {
      placeholder: 'Enter last name of missing person',
      title: 'Last name',
      name: 'missing-last-name',
      options: { required: true },
    },
    {
      placeholder: 'Select image of missing person',
      title: 'Image',
      name: 'missing-image-url',
    },
    {
      placeholder: 'Select gender of missing person',
      title: 'Gender',
      name: 'missing-gender',
    },
    {
      placeholder: 'Enter age of missing person',
      title: 'Age',
      name: 'missing-age',
      type: 'number',
    },
    {
      placeholder: 'Enter the date the missing person was last seen',
      title: 'Missing Since',
      name: 'missing-since',
      type: 'datetime-local',
    },
    {
      placeholder: 'Enter occupation of missing person',
      title: 'Occupation',
      name: 'missing-occupation',
    },
    {
      placeholder: 'Enter the state the missing person was last seen',
      title: 'State',
      name: 'missing-last-seen-state',
    },
    {
      placeholder: 'Enter the date the  missing person was reported missing',
      title: 'Date Reported',
      name: 'missing-date-reported',
      type: 'datetime-local',
    },
    {
      placeholder: 'Enter more information about the missing person',
      title: 'More Information',
      name: 'missing-more-information',
    },
  ];

  const contactPersonInputProps: TextInputProps[] = [
    {
      placeholder: 'Enter name of contact person',
      title: 'Name',
      name: 'contact-name',
    },
    {
      placeholder: 'Enter email address of contact person',
      title: 'Email',
      name: 'contact-email',
    },
    {
      placeholder: 'Enter phone number of contact person',
      title: 'Phone Number',
      name: 'contact-phone',
    },
    {
      placeholder: 'Enter address of contact person',
      title: 'Address',
      name: 'contact-address',
    },
  ];

  const reporterInputProps: TextInputProps[] = [
    {
      placeholder: 'Enter name of reporter',
      title: 'Name',
      name: 'reporter-name',
    },
    {
      placeholder: 'Enter email address of reporter',
      title: 'Email',
      name: 'reporter-email',
    },
    {
      placeholder: 'Enter phone number of reporter',
      title: 'Phone Number',
      name: 'reporter-phone',
    },
    {
      placeholder: 'Enter relation of reporter with missing person',
      title: 'Relationship',
      name: 'reporter-relationship',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      for (let i = 0; i < Object.keys(data).length; i++) {
        const key = Object.keys(data)[i];
        if (data[key] === '') {
          data[key] = null;
        }
      }
      await FirestoreService.createListing({
        createdBy: user?.id,
        missingFirstName: data['missing-first-name'],
        missingLastName: data['missing-last-name'],
        missingImageUrl: data['missing-image-url'],
        missingGender: data['missing-gender'],
        missingAge: data['missing-age'],
        missingSince: data['missing-since'],
        missingOccupation: data['missing-occupation'],
        missingLastSeenSate: data['missing-last-seen-state'],
        missingDateReported: data['missing-date-reported'],
        missingMoreInformation: data['missing-more-information'],
        contactName: data['contact-name'],
        contactEmail: data['contact-email'],
        contactPhone: data['contact-phone'],
        contactAddress: data['contact-address'],
        reporterName: data['reporter-name'],
        reporterEmail: data['reporter-email'],
        reporterPhone: data['reporter-phone'],
        reporterRelationship: data['reporter-relationship'],
      });
      toast.success('Submission Submitted');
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
          <div className=' font-bold'>Missing Person Info</div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
            {missingPersonInputProps.map((v, i) => (
              <div
                className={clsxm([
                  'min-w-[20rem] flex-1',
                  v.name === 'missing-more-information' &&
                    'w-full  flex-initial',
                ])}
                key={i}
              >
                <label htmlFor={v.name} className=''>
                  {v.title}
                </label>
                {v.name === 'missing-image-url' ? (
                  <FileInput
                    id={v.name}
                    placeholder={v.placeholder}
                    {...register(v.name ?? `${i}`)}
                  />
                ) : v.name === 'missing-gender' ? (
                  <Select
                    id={v.name}
                    placeholder={v.placeholder}
                    {...register(v.name)}
                  >
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                ) : v.name === 'missing-more-information' ? (
                  <Textarea
                    id={v.name}
                    placeholder={v.placeholder}
                    {...register(v.name)}
                  />
                ) : (
                  <TextInput
                    id={v.name}
                    type={v.type}
                    placeholder={v.placeholder}
                    {...register(v.name ?? `${i}`)}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className=' font-bold'>Contact Info</div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
            {contactPersonInputProps.map((v, i) => (
              <div className='min-w-[20rem] flex-1' key={i}>
                <label htmlFor={`${i}`} className=''>
                  {v.title}
                </label>
                <TextInput {...v} {...register(v.name ?? `${i}`)} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className=' font-bold'>Reporter Info</div>
          <div className='flex flex-wrap justify-between gap-x-2 gap-y-4'>
            {reporterInputProps.map((v, i) => (
              <div className='min-w-[20rem] flex-1' key={i}>
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
