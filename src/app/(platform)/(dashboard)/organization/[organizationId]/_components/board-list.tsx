import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormPopover } from '@/components/form/form-popover';
import { Hint } from '@/components/ui/hint';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { HelpCircle, User2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { BOARD_FREE } from '@/constant/board-count';
import { getAvailabelCount } from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';
import SearchInput from '@/components/search-input';
import FormCheckBox from '@/components/form/form-checkbox';
import { PRIORITY } from '@prisma/client';
import { cn } from '@/lib/utils';
import PaginationPage from '@/components/pagination';

export const BoardList = async ({ query, priority, page = 1 }: { query: string; priority: string; page: number }) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect('/select-org');
  }

  let arrFillter: PRIORITY[] = [];
  const priorityValues = priority.toUpperCase().split(',');
  if (priorityValues.length > 0 && priorityValues[0] !== '') {
    arrFillter = priorityValues.map((value) => value as PRIORITY);
  }

  const PAGESIZE = 3;
  const SKIP = page * PAGESIZE;
  const boards = await db.board.findMany({
    take: PAGESIZE,
    skip: SKIP,
    where: {
      orgId,
      title: { contains: query },
      ...(arrFillter.length > 0 && { priority: { in: arrFillter } }),
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (boards.length == 0 && query !== '') {
    return (
      <div className="flex justify-between">
        <p className="mt-1 text-lg font-semibold">No board has found</p>
        <SearchInput placeHolder="Search board...." />
      </div>
    );
  }

  const totalBoard = await db.board.count();
  const totalPage = Math.ceil(totalBoard / PAGESIZE);

  const isPro = await checkSubscription();

  const availabelCount = await getAvailabelCount();

  return (
    <div className="space-y-4 ">
      <div className="space-y-4 lg:space-y-0 lg:flex items-center font-semibold text-lg text-neutral-700 justify-between">
        <p className="flex gap-1 min-w-[190px]">
          <User2 className="w-6 h-6 mr-2" /> Your Board ({SKIP < totalBoard ? SKIP : totalBoard}/{totalBoard})
        </p>
        <FormCheckBox id="priority" className="mr-2 lg:max-w-[210px] pb-2" title="Priority filter" />
        <SearchInput placeHolder="Search board...." className="w-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {boards.map((board) => {
          return (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover shadow-xl bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
              <div className="flex items-center gap-1">
                <p className="relative text-xs text-white underline ">{board.title}</p>
                {board.priority && board.priority !== 'FREE' ? (
                  <>
                    <p>-</p>
                    <p
                      className={cn(
                        'font-semibold text-sm',
                        board.priority === 'HIGH'
                          ? 'text-red-700'
                          : board.priority === 'MEDIUM'
                          ? 'text-green-500'
                          : 'text-white',
                      )}
                    >
                      {board.priority.toLocaleLowerCase()}
                    </p>
                  </>
                ) : (
                  ''
                )}
              </div>
            </Link>
          );
        })}
        <FormPopover side="right" sideOffset={10}>
          <div
            className="aspect-video relative h-full w-full bg-white/70 shadow-xl rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm"> Create new Board</p>
            {isPro ? 'Unlimited ' : <span className="text-xs">{BOARD_FREE - availabelCount} Remaining</span>}
            <Hint
              side="bottom"
              sideOffset={40}
              description={`Free workspace can have up to 5 open board. For unlimited boards upgrade this workspace `}
            >
              <HelpCircle className="absolute bottom-1 right-1 h-3.5 w-3.5" />
            </Hint>
          </div>
        </FormPopover>
      </div>

      <div className="absolute bottom-4 right-4">
        <PaginationPage currentPage={page} totalPage={totalPage} pageSize={PAGESIZE} />
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
