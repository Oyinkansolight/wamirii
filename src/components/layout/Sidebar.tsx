import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { CiSettings } from 'react-icons/ci';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { RiDashboardFill, RiListCheck2 } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

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
    link: '/home/view-submissions',
  },
  {
    icon: <MdFormatListBulletedAdd />,
    label: 'Create Submissions',
    link: '/home/create-submission',
  },
  {
    icon: <CiSettings />,
    label: 'Settings',
    link: '#',
  },
];

const Sidebar = () => {
  const user = useContext(UserContext);
  const avatar = createAvatar(thumbs, {
    seed: user?.username ?? 'NO',
    radius: 50,
    // fontFamily: ['Arial'],
  });
  const router = useRouter();
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
              className={clsxm([
                'mt-5 flex transform items-center rounded-md px-2 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-700',
                router.pathname === v.link && 'bg-gray-300',
              ])}
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
            height={40}
            width={40}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              avatar.toString()
            )}`}
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
