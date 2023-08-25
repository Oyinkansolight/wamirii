import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';
import { RiDashboardFill, RiSettings4Fill } from 'react-icons/ri';
import { Menu, menuClasses, MenuItem, Sidebar as Bar } from 'react-pro-sidebar';

import { UserContext } from '@/components/layout/GetAuthStatus';

const NavItems = [
  {
    icon: <RiDashboardFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Dashboard',
    link: '/admin',
    roles: ['admin'],
  },
  {
    icon: <FaFileAlt className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Submissions',
    link: '/admin/submissions',
    roles: ['admin'],
  },
  {
    icon: <HiUsers className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Users',
    link: '/admin/users',
    roles: ['admin'],
  },
  {
    icon: <BsFillBuildingsFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Organization',
    link: '/admin/organizations',
    roles: ['admin'],
  },
  {
    icon: <RiDashboardFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Dashboard',
    link: '/manager',
    roles: ['manager'],
  },
  {
    icon: <FaFileAlt className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Submissions',
    link: '/manager/submissions',
    roles: ['manager'],
  },
  {
    icon: <HiUsers className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Volunteers',
    link: '/manager/volunteers',
    roles: ['manager'],
  },
  {
    icon: <RiSettings4Fill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Settings',
    link: '/settings',
    roles: ['admin', 'manager'],
  },
  {
    icon: <IoLogOut className='h-6 w-6 rotate-180 md:h-auto md:w-auto' />,
    label: 'Logout',
    link: '/logout',
  },
];
const breakpoints = { xs: 0, sm: 480, md: 1024 };
const Sidebar = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  const { size } = useResponsive(breakpoints);
  return (
    <Bar
      className='flex flex-col'
      backgroundColor='#F5FDF8'
      defaultCollapsed={size !== 'md'}
    >
      <Link href='/'>
        <Image
          width={70}
          height={70}
          className=' mt-10 w-auto px-5'
          src='/images/logo.png'
          alt=''
        />
      </Link>
      <div className='mt-20'>
        <Menu className='gap-y-4 px-5'>
          {NavItems.filter(
            (v) => !v.roles || v.roles.includes(user?.role ?? 'null')
          ).map((m, i) => {
            const isActive = router.pathname === m.link;
            return (
              <MenuItem
                className='mb-6 '
                active={router.pathname === m.link}
                rootStyles={{
                  ['.' + menuClasses.button]: {
                    borderRadius: '4px',
                    color: isActive
                      ? '#13602C !important'
                      : '#819289 !important',
                    padding: '0px 0px 0px 0px !important',
                    height: '40px !important',
                    backgroundColor: isActive ? '#DEF5E7 !important' : '',
                    fontWeight: isActive ? 'bold' : 'normal',
                    '&:hover': {
                      backgroundColor: '#e8f9ee !important',
                      color: '#13602C !important',
                    },
                  },
                }}
                key={i}
                icon={m.icon}
                component={<Link href={m.link ?? '#'} />}
              >
                {m.label}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Bar>
  );
};

export default Sidebar;
