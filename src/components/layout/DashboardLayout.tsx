import Sidebar from '@/components/layout/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className='flex h-screen min-h-screen flex-col bg-[#F7F8FA]'>
    {/* <Header /> */}

    <div className='flex flex-1 flex-row overflow-y-hidden'>
      <main className='flex-1 overflow-y-auto p-2'>
        <div>{children}</div>
      </main>
      <Sidebar />
    </div>
  </div>
);

export default Layout;
