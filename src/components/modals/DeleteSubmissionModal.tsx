import { Dialog, Transition } from '@headlessui/react';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { Listing } from '@/types/listing';

interface BasicModalProps {
  children: JSX.Element;
  submission?: Listing;
}

export default function DeleteSubmissionModal({
  children,
  submission,
}: BasicModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <div onClick={openModal}>{children}</div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all'>
                  <Image
                    width={150}
                    height={100}
                    alt='Wamirii Logo'
                    src='/images/logo.png'
                    className='mx-auto'
                  />

                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Delete Submission
                  </Dialog.Title>

                  <div className='mt-4 flex min-h-[15rem] flex-col'>
                    <div className='flex-1' />
                    <div>
                      You are about to delete the submission for{' '}
                      {submission?.missingFirstName}{' '}
                      {submission?.missingLastName}. This action cannot be
                      reversed.
                    </div>
                    <div className='flex-1' />
                    <div className='mt-6 flex justify-center  gap-4 transition-all delay-1000'>
                      <Button
                        onClick={closeModal}
                        className='bg-gray-400 text-black hover:bg-gray-500'
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={isLoading}
                        onClick={async () => {
                          setIsLoading(true);
                          await FirestoreService.deleteListing(
                            submission?._id ?? ''
                          );
                          setIsLoading(false);
                          closeModal();
                        }}
                        className='bg-red-500 text-white hover:bg-red-700'
                      >
                        Confirm Delete
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
