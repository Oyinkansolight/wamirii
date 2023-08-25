import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import SettingsView from '@/components/views/settings/SettingsView';

import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  return (
    <DashboardLayout2>
      <SettingsView />
    </DashboardLayout2>
  );
}, ['admin', 'manager', 'volunteer']);
