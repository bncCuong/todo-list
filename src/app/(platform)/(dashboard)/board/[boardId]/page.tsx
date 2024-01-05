import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

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
  return <div className="">Borad page</div>;
};

export default BoardPage;
