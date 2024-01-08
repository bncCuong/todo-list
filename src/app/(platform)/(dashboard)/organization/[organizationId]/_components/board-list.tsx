/* eslint-disable react/display-name */
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

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect('/select-org');
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const availabelCount = await getAvailabelCount();
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="w-6 h-6 mr-2" /> Your Board
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => {
          return (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
              <p className="relative text-sm text-white underline">{board.title}</p>
            </Link>
          );
        })}
        <FormPopover side="right" sideOffset={10}>
          <div
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm"> Create new Board</p>
            <span className="text-xs">{BOARD_FREE - availabelCount} Remaining</span>
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
    </div>
  );
};

BoardList.Skeleton = () => {
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
