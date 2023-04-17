import Link from 'next/link';
import React, { useContext } from 'react';

import { UserContext } from '@/components/layout/GetAuthStatus';
import ProfilePicture from '@/components/profile/ProfilePicture';

const DashboardHeader = () => {
  const user = useContext(UserContext);

  return (
    <nav className=' relative mx-auto flex h-20 w-full items-center justify-end bg-white px-8'>
      <div className='flex-initial'>
        <div className='relative flex items-center justify-end'>
          <div className='mr-4 flex items-center'>
            <Link
              className='inline-block rounded-full py-2 px-3 hover:bg-gray-200'
              href='/home/profile'
            >
              <div className='relative flex cursor-pointer items-center whitespace-nowrap'>
                Hello, {user?.username}
              </div>
            </Link>
          </div>

          <div className='block'>
            <div className='relative inline'>
              <button
                type='button'
                className='relative inline-flex items-center rounded-full border hover:shadow-lg'
              >
                <div>
                  <ProfilePicture user={user} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
