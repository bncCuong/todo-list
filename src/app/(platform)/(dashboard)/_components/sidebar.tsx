/** @format */
'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce, useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Organization, NavItem } from './nav-item';
import LoadingBar from 'react-top-loading-bar';
import { Input } from '@/components/ui/input';
import _ from 'lodash';
interface SideBarProps {
  storageKey: string;
}
const Sidebar = ({ storageKey = 't-sidebar-state' }: SideBarProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key);
    }
    return acc;
  }, []);

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };
  useEffect(() => {
    setProgress(100);
  }, [isLoadedOrg, isLoadedOrgList, userMemberships.isLoading]);

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        {/* <LoadingBar loaderSpeed={2500} color="red" progress={progress} onLoaderFinished={() => setProgress(0)} /> */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <LoadingBar loaderSpeed={2500} color="red" progress={progress} onLoaderFinished={() => setProgress(0)} />

      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">WorkSpaces</span>
        <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
        {userMemberships.data.map(({ organization }) => {
          return (
            <NavItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          );
        })}
      </Accordion>
    </>
  );
};

export default Sidebar;
