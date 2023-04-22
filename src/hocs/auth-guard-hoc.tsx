'use client';
import AuthGuard from '@/components/layout/AuthGuard';

export default function AuthGuardHOC<T_PROPS extends JSX.IntrinsicAttributes>(
  Component: (props: T_PROPS) => JSX.Element
): (props: T_PROPS) => JSX.Element {
  return function C(props: T_PROPS) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
