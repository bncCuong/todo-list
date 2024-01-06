import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ListContainer } from './_components/list-container';

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: { orgId },
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
