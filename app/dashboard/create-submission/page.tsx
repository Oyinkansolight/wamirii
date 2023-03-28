'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { UserContext } from '@/components/layout/AuthGuard';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

const Page = AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
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
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Missing Person Info</div>
      <input {...register('missing-first-name')} />
      <input {...register('missing-last-name')} />
      <input type='file' {...register('missing-image-url')} />
      <input {...register('missing-gender')} />
      <input {...register('missing-age')} />
      <input {...register('missing-since')} />
      <input {...register('missing-occupation')} />
      <input {...register('missing-last-seen-state')} />
      <input {...register('missing-date-reported')} />
      <input {...register('missing-more-information')} />
      <div>Contact Info</div>
      <input {...register('contact-name')} />
      <input {...register('contact-email')} />
      <input {...register('contact-phone')} />
      <input {...register('contact-address')} />
      <div>Reporter Info</div>
      <input {...register('reporter-name')} />
      <input {...register('reporter-email')} />
      <input {...register('reporter-phone')} />
      <input {...register('reporter-relationship')} />
      <button>Submit</button>
    </form>
  );
});

export default Page;
