import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ListContainer } from './_components/list-container';
import { PRIORITY } from '@prisma/client';

const BoardPage = async ({
  params,
  searchParams,
}: {
  params: { boardId: string };
  searchParams: { query: string; filter_priority: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }
  let arrFillter: PRIORITY[] = [];
  if (searchParams.filter_priority !== undefined) {
    const priorityValues = searchParams.filter_priority.toUpperCase().split(',');
    if (priorityValues.length > 0 && priorityValues[0] !== '') {
      arrFillter = priorityValues.map((value) => value as PRIORITY);
    }
  }

  const paramsSearch = searchParams.query || '';
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: { orgId },
      title: { contains: paramsSearch },
      ...(arrFillter.length > 0 && { priority: { in: arrFillter } }),
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });
  return (
    <div className="p-4 overflow-x-auto h-full ">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardPage;
