import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { CiSettings } from 'react-icons/ci';
import { ImProfile } from 'react-icons/im';
import { MdFormatListBulletedAdd, MdLogout } from 'react-icons/md';
import { RiDashboardFill, RiListCheck2 } from 'react-icons/ri';
import { Menu, MenuItem, Sidebar as Bar, SubMenu } from 'react-pro-sidebar';

import clsxm from '@/lib/clsxm';

import { UserContext } from '@/components/layout/GetAuthStatus';

const NavItems = [
  {
    icon: <RiDashboardFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Dashboard',
    link: '/home',
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
    icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Users',
    roles: ['admin'],
    children: [
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Users',
        link: '/home/users?role=user',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Admins',
        link: '/home/users?role=admin',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Managers',
        link: '/home/users?role=manager',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Organizations',
        link: '/home/users?role=organization',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Volunteers',
        link: '/home/users?role=volunteer',
      },
      {
        icon: (
          <MdFormatListBulletedAdd className='h-6 w-6 md:h-auto md:w-auto' />
        ),
        label: 'Create Users',
        link: '/home/users/create',
      },
    ],
  },
  {
    icon: <ImProfile className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Profile',
    link: '/home/profile',
  },
  {
    icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Organization',
    roles: ['manager'],
    children: [
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Users',
        link: '/home/organization',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'View Submissions',
        link: '/home/organization/submissions',
      },
      {
        icon: <RiListCheck2 className='h-6 w-6 md:h-auto md:w-auto' />,
        label: 'Create User',
        link: '/home/organization/create_user',
      },
    ],
  },
  {
    icon: <CiSettings className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Settings',
    link: '#',
  },
  {
    icon: <MdLogout className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Log Out',
    link: '/logout',
  },
];
const breakpoints = { xs: 0, sm: 480, md: 1024 };
const Sidebar = () => {
  const router = useRouter();
  const user = useContext(UserContext);

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
          {NavItems.filter(
            (v) => !v.roles || v.roles.includes(user?.role ?? 'null')
          ).map((m, i) => {
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
