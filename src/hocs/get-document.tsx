import { DocumentData } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function GetDocumentHOC<T_PROPS extends JSX.IntrinsicAttributes>(
  Component: (props: T_PROPS & { doc: DocumentData }) => JSX.Element,
  docPath: string
): (props: T_PROPS) => JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, unused-imports/no-unused-vars
  const [doc, loading, error] = useDocumentData(
    FirestoreService.getDocRef(`${docPath}`)
  );

  return function C(props: T_PROPS) {
    return doc ? <Component {...props} doc={doc} /> : <div></div>;
  };
}
