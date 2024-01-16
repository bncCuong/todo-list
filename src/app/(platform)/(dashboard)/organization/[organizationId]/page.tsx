/** @format */

import { Separator } from '@/components/ui/separator';
import { Info } from './_components/info';
import { BoardList } from './_components/board-list';
import { Suspense } from 'react';
import { checkSubscription } from '@/lib/subscription';

const OrganizationIdPage = async ({ searchParams }: { searchParams: { query?: string; filter_priority?: string } }) => {
  const query = searchParams?.query || '';
  const priority = searchParams.filter_priority || '';

  const isPro = await checkSubscription();
  return (
    <div className="w-full bg-slate-500/10 h-[95%] p-10 rounded-lg shadow-xl overflow-hidden overflow-y-auto">
      <Info isPro={isPro} />
      <Separator className="my-4 bg-black/60 shadow-md" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList query={query} priority={priority} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
