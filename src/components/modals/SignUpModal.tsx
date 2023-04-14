import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import SignUpView from '@/views/auth/signup';

interface BasicModalProps {
  children: JSX.Element;
}

export default function SignUpModal({ children }: BasicModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.query['auth']) {
      if (Number.parseInt(router.query['auth'] as string) === 1) {
        setIsOpen(true);
        setPage(Number.parseInt(router.query['auth'] as string));
      } else {
        setIsOpen(false);
      }
    }
  }, [router.query]);

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
                    {page === 0 ? 'Welcome back!' : 'Register'}
                  </Dialog.Title>

                  <div className='mt-4 flex min-h-[15rem] flex-col'>
                    <div className='mt-6 flex flex-col justify-center transition-all delay-1000'>
                      <SignUpView />
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
