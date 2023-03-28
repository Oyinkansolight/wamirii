'use client';
import AuthGuard from '@/components/layout/AuthGuard';

export default function AuthGuardHOC<T_PROPS extends JSX.IntrinsicAttributes>(
  Component: (props: T_PROPS) => JSX.Element
): (props: T_PROPS) => JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function C(props: T_PROPS) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
