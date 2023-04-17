import DashboardHeader from '@/components/layout/DashboardHeader';
import Sidebar from '@/components/layout/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className='flex h-screen min-h-screen flex-col bg-[#F7F8FA]'>
    {/* <Header /> */}

    <div className='flex flex-1 flex-row overflow-y-hidden'>
      <Sidebar />
      <div className='flex flex-1 flex-col overflow-x-hidden'>
        <DashboardHeader />
        <main className='mt-4 flex-1 overflow-y-auto overflow-x-hidden p-2 md:mt-10 md:p-10'>
          {children}
        </main>
      </div>
    </div>
  </div>
);

export default Layout;
