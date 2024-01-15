import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ListContainer } from './_components/list-container';

const BoardPage = async ({ params, searchParams }: { params: { boardId: string }, searchParams: {query: string} }) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }

  const paramsSearch = searchParams.query || ""
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: { orgId },
      title: {contains: paramsSearch}
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
