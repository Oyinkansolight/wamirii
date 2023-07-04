import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import clsxm from '@/lib/clsxm';

export interface BasicModalProps {
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  size?: 'md' | 'lg';
}

export default function GeneralModal({
  children,
  isOpen,
  setIsOpen,
  size = 'md',
}: BasicModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
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
            <div className='flex min-h-full items-center justify-center text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className={clsxm(
                    'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all',
                    size === 'lg' ? 'max-w-4xl' : ''
                  )}
                >
                  <div className=' flex min-h-[15rem] flex-col'>
                    <div className=' flex flex-col justify-center transition-all delay-1000'>
                      {children}
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
