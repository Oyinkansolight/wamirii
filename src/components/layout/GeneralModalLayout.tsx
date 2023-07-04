import { createContext, useCallback, useState } from 'react';

import ActionFailedView from '@/components/modal-views/ActionFailed';
import ActionSuccessView from '@/components/modal-views/ActionSuccess';
import GeneralModal, {
  BasicModalProps,
} from '@/components/modals/GeneralModal';

export const GeneralModalContext = createContext<{
  setIsOpen: (value: boolean) => void;
  setContent: (value: JSX.Element, size?: BasicModalProps['size']) => void;
  error: (tryAgain: () => void, errMsg: string) => void;
  success: (msg: string) => void;
} | null>(null);
export default function GeneralModalLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<JSX.Element>(<div></div>);
  const [size, setSize] = useState<BasicModalProps['size']>('md');

  const error = useCallback((tryAgain: () => void, errMsg: string) => {
    setContent(
      <ActionFailedView
        title='Error'
        subtitle={errMsg}
        tryAgain={tryAgain}
        onClose={() => setIsOpen(false)}
      />
    );
  }, []);
  const success = useCallback((msg: string) => {
    setContent(
      <ActionSuccessView
        title='Success'
        subtitle={msg}
        onClose={() => setIsOpen(false)}
      />
    );
  }, []);
  return (
    <GeneralModalContext.Provider
      value={{
        setIsOpen,
        setContent: (v, size) => {
          if (size) setSize(size);
          else setSize('md');
          setContent(v);
        },
        error,
        success,
      }}
    >
      {children}
      <GeneralModal size={size} setIsOpen={setIsOpen} isOpen={isOpen}>
        {content}
      </GeneralModal>
    </GeneralModalContext.Provider>
  );
}
