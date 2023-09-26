import { Menu, MenuItem } from '@szhsin/react-menu';
import { useRouter } from 'next/router';
import { AiFillCaretDown } from 'react-icons/ai';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import ProfilePicture from '@/components/profile/ProfilePicture';

import { User } from '@/types/user';

export default function UserMiniProfile({
  user,
  onClick,
}: {
  user: User | null;
  onClick?: () => void;
}) {
  const router = useRouter();
  return (
    <Menu
      menuButton={
        <div className='flex cursor-pointer items-center rounded-full bg-[#DFF5E6] py-1.5 px-3 text-xs text-[#13602C]'>
          <ProfilePicture size={25} user={user} />
          <div className='w-2' />
          <div>My Profile</div>
          <AiFillCaretDown />
        </div>
      }
    >
      <MenuItem onClick={onClick}>Profile</MenuItem>
      <MenuItem onClick={() => router.push('logout')}>Log Out</MenuItem>
    </Menu>
  );
}
