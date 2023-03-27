import '/src/styles/globals.css';

import Sidebar from '@/components/layout/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <div className='flex h-screen min-h-screen flex-col bg-[#F7F8FA]'>
        {/* <Header /> */}

        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <main className='flex-1 overflow-y-auto p-2 text-xs'>
            <div>{children}</div>
          </main>

          <Sidebar />
        </div>
      </div>
    </html>
  );
}
