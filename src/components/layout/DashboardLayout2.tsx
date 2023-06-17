import DashboardHeader from '@/components/layout/DashboardHeader';
import Sidebar2 from '@/components/layout/Sidebar2';

const DashboardLayout2 = ({ children }: { children: React.ReactNode }) => (
  <div className='flex h-screen min-h-screen flex-col bg-white'>
    {/* <Header /> */}

    <div className='flex flex-1 flex-row overflow-y-hidden'>
      <Sidebar2 />
      <div className='flex flex-1 flex-col overflow-x-hidden'>
        <DashboardHeader />
        <main className='mb-10 flex-1 overflow-y-auto overflow-x-hidden px-4'>
          {children}
        </main>
      </div>
    </div>
  </div>
);

export default DashboardLayout2;
