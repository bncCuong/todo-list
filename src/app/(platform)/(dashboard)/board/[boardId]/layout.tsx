import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import BoardNavbar from './_components/board-navbar';

export async function generateMetadata({ params }: { params: { boardId: string } }) {
  const { orgId } = auth();

  if (!orgId) {
    return { title: 'Board' };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || 'Board',
  };
}

const BoardLayout = async ({ children, params }: { children: React.ReactNode; params: { boardId: string } }) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect('/select-org');
  }

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="bg-no-repeat bg-center relative bg-cover h-full"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar _data={board} />
      <main className="pt-28 relative h-full mx-4">{children}</main>
    </div>
  );
};
export default BoardLayout;
