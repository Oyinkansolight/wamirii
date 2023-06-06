import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { RiDashboardFill, RiSettings4Fill } from 'react-icons/ri';
import { Menu, menuClasses, MenuItem, Sidebar as Bar } from 'react-pro-sidebar';

import { UserContext } from '@/components/layout/GetAuthStatus';

const NavItems = [
  {
    icon: <RiDashboardFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Dashboard',
    link: '/home',
  },
  {
    icon: <FaFileAlt className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Submissions',
    link: '/home',
  },
  {
    icon: <HiUsers className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Users',
    link: '/home',
  },
  {
    icon: <BsFillBuildingsFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Organization',
    link: '/home',
  },
  {
    icon: <RiSettings4Fill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Settings',
    link: '#',
  },
  {
    icon: <RiDashboardFill className='h-6 w-6 md:h-auto md:w-auto' />,
    label: 'Dashboard',
    link: '/home',
    roles: [''],
  },
];
const breakpoints = { xs: 0, sm: 480, md: 1024 };
const Sidebar = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  const { size } = useResponsive(breakpoints);
  return (
    <Bar backgroundColor='#F5FDF8' defaultCollapsed={size === 'xs'}>
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
            // if (m.children) {
            //   // return (
            //   //   <SubMenu defaultOpen key={i} label={m.label} icon={m.icon}>
            //   //     {m.children.map((sub, j) => (
            //   //       <MenuItem
            //   //         active={router.pathname === sub.link}
            //   //         className={clsxm(
            //   //           'hover:bg-black',
            //   //           router.pathname === sub.link
            //   //             ? 'bg-gray-400 '
            //   //             : 'text-black'
            //   //         )}
            //   //         key={j}
            //   //         icon={sub.icon}
            //   //         component={<Link href={sub.link ?? '#'} />}
            //   //       >
            //   //         {sub.label}
            //   //       </MenuItem>
            //   //     ))}
            //   //   </SubMenu>
            //   // );
            // } else {
            return (
              <MenuItem
                className='mb-6'
                active={router.pathname === m.link}
                rootStyles={{
                  ['.' + menuClasses.button]: {
                    borderRadius: '4px',
                    color: '#819289 !important',
                    padding: '0px 0px 0px 0px !important',
                    height: '40px !important',
                    '&:hover': {
                      backgroundColor: '#DEF5E7 !important',
                      color: '#13602C !important',
                      fontWeight: 'bold',
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
