'use client';
import AuthGuard from '@/components/layout/AuthGuard';

import { roles } from '@/constant/generic';

export default function AuthGuardHOC<T_PROPS extends JSX.IntrinsicAttributes>(
  Component: (props: T_PROPS) => JSX.Element,
  role?: (typeof roles)[number][]
): (props: T_PROPS) => JSX.Element {
  return function C(props: T_PROPS) {
    return (
      <AuthGuard role={role}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
