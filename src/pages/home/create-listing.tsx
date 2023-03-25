import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { UserContext } from '@/components/layout/AuthGuard';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await FirestoreService.createListing({
      createdBy: user?.id,
      person: {
        firstName: data['missing-first-name'],
        lastName: data['missing-last-name'],
        imageUrl: data['missing-image-url'],
        age: data['missing-age'],
        missingSince: data['missing-since'],
        occupation: data['missing-occupation'],
        lastSeenState: data['missing-last-seen-state'],
        dateReported: data['missing-date-reported'],
        moreInformation: data['missing-more-information'],
      },
      contact: {
        name: data['contact-name'],
        email: data['contact-email'],
        phone: data['contact-phone'],
        address: data['contact-address'],
      },
      reporter: {
        name: data['reporter-name'],
        email: data['reporter-email'],
        phone: data['reporter-phone'],
        relationship: data['reporter-relationship'],
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Missing Person Info</div>
      <input {...register('missing-first-name')} />
      <input {...register('missing-last-name')} />
      <input {...register('missing-image-url')} />
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
