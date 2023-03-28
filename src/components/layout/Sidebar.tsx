import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CiSettings } from 'react-icons/ci';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { RiDashboardFill, RiListCheck2 } from 'react-icons/ri';

import { UserContext } from '@/components/layout/GetAuthStatus';

const NavItems = [
  {
    icon: <RiDashboardFill />,
    label: 'Dashboard',
    link: '/home',
  },
  {
    icon: <RiListCheck2 />,
    label: 'Submissions',
    link: '/home/view-listing',
  },
  {
    icon: <MdFormatListBulletedAdd />,
    label: 'Create Submissions',
    link: '/home/create-listing',
  },
  {
    icon: <CiSettings />,
    label: 'Settings',
    link: '#',
  },
];

const Sidebar = () => {
  const user = useContext(UserContext);
  return (
    <aside className='order-first flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-4 py-8 rtl:border-r-0 rtl:border-l'>
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
              className='mt-5 flex transform items-center rounded-md px-2 py-2 text-gray-600 transition-colors duration-300 hover:text-gray-700'
              href={v.link}
            >
              {v.icon}

              <span className='mx-4 font-medium'>{v.label}</span>
            </Link>
          ))}

          <hr className='my-6 border-gray-200 dark:border-gray-600' />
        </nav>

        <Link href='#' className='-mx-2 flex items-center px-4'>
          <Image
            width={63}
            height={63}
            className='mx-2 h-9 w-9 rounded-full object-cover'
            src='https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            alt='avatar'
          />
          <span className='mx-2 font-medium text-gray-800 dark:text-gray-200'>
            {user?.username}
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
