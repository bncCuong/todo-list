/** @format */

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import React from 'react';
import MobileSidebar from './mobie-sidebar';
import { FormPopover } from '@/components/form/form-popover';
import ClockRealTime from '@/components/clock-realtime';
import { useFormStatus } from 'react-dom';

const Navbar = () => {
  return (
    <nav className="fixed z-50 px-4 flex items-center w-full h-14 bg-white border-b shadow-sm  justify-between">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button className="rounded-sm hidden md:block h-auto py-1.5 px-2" size="sm" variant="gradient">
            Create
          </Button>
        </FormPopover>

        <FormPopover align="start" side="right" sideOffset={18}>
          <Button size="sm" className="md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <ClockRealTime />
      <div className="flex items-center gap-x-2">
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
      </div>
    </nav>
  );
};

export default Navbar;
