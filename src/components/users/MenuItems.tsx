import { useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MenuItem } from 'react-pro-sidebar';

import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import CreateUserView from '@/components/modal-views/CreateUserView';

import { Role, User } from '@/types/user';

export function EditUserMenuItem({ user, role }: { user?: User; role: Role }) {
  const g = useContext(GeneralModalContext);
  return (
    <MenuItem
      onClick={() => {
        if (g) {
          g.setContent(
            <CreateUserView
              onClose={() => g.setIsOpen(false)}
              role={role}
              userToEdit={user}
            />
          );
          g.setIsOpen(true);
        }
      }}
    >
      <div className='flex gap-2'>
        <BiEdit />
        <div>Edit</div>
      </div>
    </MenuItem>
  );
}
