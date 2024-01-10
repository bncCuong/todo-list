/** @format */

import React from 'react';
import Sidebar from '../_components/sidebar';

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto h-full ">
      <div className="flex gap-x-7 h-full">
        <div className="w-72 px-2 shrink-0 hidden md:block bg-slate-500/10 h-[95%] rounded-lg">
          <Sidebar storageKey="t-sidebar-state" />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
