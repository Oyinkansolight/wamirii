import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';

import Button from '@/components/buttons/Button';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import ActionSuccessView from '@/components/modal-views/ActionSuccess';
import GeneralActionView from '@/components/modal-views/GeneralActionView';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { Listing } from '@/types/listing';

export default function DeleteSubmissionView({
  submission,
}: {
  submission?: Listing;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const generalModal = useContext(GeneralModalContext);
  const router = useRouter();
  const handleDelete = useCallback(async () => {
    if (submission?._id) {
      setIsLoading(true);
      try {
        await FirestoreService.deleteListing(submission?._id);
        generalModal?.setContent(
          <ActionSuccessView
            onClose={() => {
              generalModal.setIsOpen(false);
              router.push('/admin/submissions');
            }}
            title='Delete Successful'
            subtitle={`Deleted Submission for ${submission.missingFirstName} ${submission.missingLastName}`}
          />
        );
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    generalModal,
    router,
    submission?._id,
    submission?.missingFirstName,
    submission?.missingLastName,
  ]);
  return (
    <GeneralActionView
      iconLink='/images/delete_prompt.png'
      actions={
        <div className='flex items-center gap-4'>
          <Button
            onClick={() => generalModal?.setIsOpen(false)}
            className='min-w-[12rem] justify-center'
            variant='outline'
          >
            <div>Close</div>
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => handleDelete()}
            className='min-w-[12rem] justify-center'
          >
            <div>{isFailed ? 'Try Again' : 'Delete'}</div>
          </Button>
        </div>
      }
      title={isFailed ? 'Delete Failed!!!' : 'Delete Submission'}
      subtitle={`Delete this submission for ${submission?.missingFirstName} ${submission?.missingLastName}`}
    />
  );
}
