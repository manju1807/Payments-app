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
      <div className='min-h-screen w-full flex'>
        <main className='w-full flex flex-row'>
          <SideNavbar />
          <div className='p-8 w-full'>{children}</div>
        </main>
      </div>
    )
  );
}

export default Template;
