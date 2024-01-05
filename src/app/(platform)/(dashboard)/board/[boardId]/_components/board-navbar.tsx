import { auth } from '@clerk/nextjs';
import { Board } from '@prisma/client';
import { BoardTitleFrom } from './board-title_form';
import BoardOption from './board-options';

interface BoardNavbarProps {
  _data: Board;
}

const BoardNavbar = async ({ _data }: BoardNavbarProps) => {
  const { orgId } = auth();

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 text-white flex px-6 gap-x-4 items-center ">
      <BoardTitleFrom data={_data} />
      <div className="ml-auto">
        <BoardOption id={_data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
