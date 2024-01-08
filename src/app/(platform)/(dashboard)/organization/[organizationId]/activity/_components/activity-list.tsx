/* eslint-disable react/display-name */
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityItem } from '@/components/activity-items';

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) redirect('/select-org');

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((item) => {
        return <ActivityItem key={item.id} data={item} />;
      })}
    </ol>
  );
};

export default ActivityList;

ActivityList.Skeleton = () => {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[60%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[90%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[50%] h-14" />
    </ol>
  );
};
