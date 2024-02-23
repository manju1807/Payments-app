'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Nav } from './ui/nav';
import {
  IndianRupee,
  WalletCards,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from './ui/button';

function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`relative ${
        isCollapsed ? 'sm:w-fit md:min-w-fit' : 'sm:min-w-fit md:min-w-64'
      } border-r px-3 pb-10 pt-24 bg-violet-400`}
    >
      <Button
        onClick={toggleSidebar}
        variant='secondary'
        className='rounded-full p-2 absolute -right-5 top-6'
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: isCollapsed ? '' : 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
            variant: 'default',
          },
          {
            title: isCollapsed ? '' : 'Payment List',
            href: '/payment-list',
            icon: WalletCards,
            variant: 'ghost',
          },
          {
            title: isCollapsed ? '' : 'Create Payment',
            href: '/create-payment',
            icon: IndianRupee,
            variant: 'ghost',
          },
        ]}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(SideNavbar), { ssr: false });
