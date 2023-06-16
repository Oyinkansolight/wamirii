import { createContext, useState } from 'react';

import GeneralModal from '@/components/modals/GeneralModal';

export const GeneralModalContext = createContext<{
  setIsOpen: (value: boolean) => void;
  setContent: (value: JSX.Element) => void;
} | null>(null);
export default function GeneralModalLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<JSX.Element>(<div></div>);
  return (
    <GeneralModalContext.Provider value={{ setIsOpen, setContent }}>
      {children}
      <GeneralModal setIsOpen={setIsOpen} isOpen={isOpen}>
        {content}
      </GeneralModal>
    </GeneralModalContext.Provider>
  );
}
