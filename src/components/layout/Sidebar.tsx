import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { CiSettings } from 'react-icons/ci';
import { ImProfile } from 'react-icons/im';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { RiDashboardFill, RiListCheck2 } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

import { UserContext } from '@/components/layout/GetAuthStatus';
import ProfilePicture from '@/components/profile/ProfilePicture';

const NavItems = [
  {
    icon: <RiDashboardFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Dashboard',
    link: '/home',
  },
  {
    icon: <ImProfile className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Profile',
    link: '/home/profile',
  },
  {
    icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Submissions',
    link: '/home/view-submissions',
  },
  {
    icon: <MdFormatListBulletedAdd className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Create Submissions',
    link: '/home/create-submission',
  },
  {
    icon: <CiSettings className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Settings',
    link: '#',
  },
];

const Sidebar = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  return (
    <aside className='order-first flex h-screen w-20 min-w-[80px] flex-col overflow-y-auto border-r bg-white px-2 py-8 rtl:border-r-0 rtl:border-l md:w-64 md:px-4'>
      <Link href='#'>
        <Image
          width={200}
          height={100}
          className='w-auto'
          src='/images/logo.png'
          alt=''
        />
      </Link>

      <div className='mt-6 flex flex-1 flex-col justify-between'>
        <nav>
          {NavItems.map((v, i) => (
            <Link
              key={i}
              className={clsxm([
                'mt-5 flex transform items-center rounded-md px-2 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-700',
                router.pathname === v.link && 'bg-gray-300',
              ])}
              href={v.link}
            >
              {v.icon}

              <span className='mx-4 hidden font-medium md:block'>
                {v.label}
              </span>
            </Link>
          ))}

          <hr className='my-6 border-gray-200 dark:border-gray-600' />
        </nav>

        <Link href='#' className='-mx-2 hidden items-center px-4 md:flex'>
          <ProfilePicture user={user} />
          <span className='mx-2 font-medium text-gray-800 dark:text-gray-200'>
            {user?.username}
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
