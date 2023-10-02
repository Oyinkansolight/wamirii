import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import { CloseButton } from '@/components/buttons/CloseButton';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function CreateFollowUpComment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const router = useRouter();
  const { id } = router.query;
  const user = useContext(UserContext);
  const g = useContext(GeneralModalContext);

  const onSubmit = async (data: any) => {
    if (user) {
      if (!id) {
        toast.error('Submission id not set');
        return;
      }
      try {
        await FirestoreService.createFollowUp({
          comment: data.comment,
          submissionId: id as string,
          user: user,
        });
        if (g) {
          g.setIsOpen(false);
        }
        toast.success('Follow up comment submitted');
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-full flex-col gap-4'
    >
      <div className='flex items-center justify-between'>
        <div className='text-3xl font-bold'>Comments</div>
        <CloseButton
          onClick={() => {
            if (g) {
              g.setIsOpen(false);
            }
          }}
        />
      </div>
      <textarea
        {...register('comment', {
          validate: {
            notEmpty: (v) => v !== '' || 'This field must not be empty',
          },
        })}
        className='h-56 w-full rounded-md border-none bg-[#F3F3F3]'
      ></textarea>
      {errors['comment'] && (
        <div className='text-red-400'>
          {errors['comment']?.message?.toString() ?? ''}
        </div>
      )}
      <Button type='submit' className='w-full justify-center'>
        Submit Comment
      </Button>
    </form>
  );
}
