import DashboardLayout2 from '@/components/layout/DashboardLayout2';

import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  return (
    <DashboardLayout2>
      <div>Work in Progress</div>
    </DashboardLayout2>
  );
}, ['manager']);
