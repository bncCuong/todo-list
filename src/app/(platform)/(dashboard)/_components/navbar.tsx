/** @format */

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import React from 'react';
import MobileSidebar from './mobie-sidebar';

const Navbar = () => {
  return (
    <nav className="fixed z-50 px-4 flex items-center w-full h-14 bg-white border-b shadow-sm ">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          size="sm"
        >
          Create
        </Button>
        <Button size="sm" className="md:hidden">
          <Plus className="h-4 w-4"/>
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />
      </div>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarImage: {
              height: 30,
              width: 30,
              objectFit: 'contain',
            },
          },
        }}
      />
    </nav>
  );
};

export default Navbar;
