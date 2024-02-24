'use client';

import SideNavbar from '@/components/Sidebar';
import { useEffect, useState } from 'react';

function Template({ children }) {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    isClient && (
      <div className='min-h-screen w-full max-w-screen flex'>
        <main className='w-full flex flex-row max-w-screen'>
          <SideNavbar />
          <div className='p-8 w-full max-w-screen'>{children}</div>
        </main>
      </div>
    )
  );
}

export default Template;
