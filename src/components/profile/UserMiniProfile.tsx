import { AiFillCaretDown } from 'react-icons/ai';

import ProfilePicture from '@/components/profile/ProfilePicture';

import { User } from '@/types/user';

export default function UserMiniProfile({
  user,
  onClick,
}: {
  user: User | null;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className='flex cursor-pointer items-center rounded-full bg-[#DFF5E6] py-1.5 px-3 text-xs text-[#13602C]'
    >
      <ProfilePicture size={25} user={user} />
      <div className='w-2' />
      <div>My Profile</div>
      <AiFillCaretDown />
    </div>
  );
}
