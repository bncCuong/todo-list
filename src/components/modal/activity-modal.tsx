'use client';

import { AuditLog } from '@prisma/client';
import { ActivityIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { ActivityItem } from '../activity-items';

interface ActivityProps {
  items: AuditLog[];
}

export const ActivityModal = ({ items }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full ml-[180px] md:ml-10">
      <div className="w-full">
        <div className="flex gap-2">
          <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700 " />
          <p className="font-semibold text-neutral-700 mb-2">Activity</p>
        </div>
        <ol className=" space-y-4">
          {items.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

ActivityModal.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
