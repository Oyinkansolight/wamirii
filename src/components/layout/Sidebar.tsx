import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { CiSettings } from 'react-icons/ci';
import { ImProfile, ImUsers } from 'react-icons/im';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { RiDashboardFill, RiListCheck2 } from 'react-icons/ri';
import { Menu, MenuItem, Sidebar as Bar, SubMenu } from 'react-pro-sidebar';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

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
    icon: <ImUsers className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Sub Count',
    link: '/home/counter',
  },
  {
    icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Submissions',
    children: [
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'My Submissions',
        link: '/home/view-submissions',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'All Submissions',
        link: '/home/view-all-submissions',
      },
      {
        icon: (
          <MdFormatListBulletedAdd className='h-6 w-6 md:h-auto md:w-auto' />
        ),
        label: 'Create Submissions',
        link: '/home/create-submission',
      },
    ],
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
const breakpoints = { xs: 0, sm: 480, md: 1024 };
const Sidebar = () => {
  const router = useRouter();
  logger(router.pathname);
  const { size } = useResponsive(breakpoints);
  return (
    <Bar defaultCollapsed={size === 'xs'}>
      <Link href='/'>
        <Image
          width={70}
          height={70}
          className='mx-auto mt-10 w-auto'
          src='/images/logo.png'
          alt=''
        />
      </Link>
      <div className='mt-20'>
        <Menu>
          {NavItems.map((m, i) => {
            if (m.children) {
              return (
                <SubMenu defaultOpen key={i} label={m.label} icon={m.icon}>
                  {m.children.map((sub, j) => (
                    <MenuItem
                      active={router.pathname === sub.link}
                      className={clsxm(
                        'hover:bg-black',
                        router.pathname === sub.link
                          ? 'bg-gray-400 '
                          : 'text-black'
                      )}
                      key={j}
                      icon={sub.icon}
                      component={<Link href={sub.link ?? '#'} />}
                    >
                      {sub.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <MenuItem
                  active={router.pathname === m.link}
                  className={clsxm(
                    'hover:bg-black',
                    router.pathname === m.link ? 'bg-primary-100' : 'text-black'
                  )}
                  key={i}
                  icon={m.icon}
                  component={<Link href={m.link ?? '#'} />}
                >
                  {m.label}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </div>
    </Bar>
  );
};

export default Sidebar;
