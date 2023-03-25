import AuthGuard from '@/components/layout/AuthGuard';

export default function AuthGuardHOC<T_PROPS>(
  Component: (props: T_PROPS) => JSX.Element
): (props: T_PROPS) => JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function C(props: any) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
