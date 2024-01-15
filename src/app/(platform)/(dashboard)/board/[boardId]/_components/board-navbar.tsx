import { auth } from '@clerk/nextjs';
import { Board } from '@prisma/client';
import { BoardTitleFrom } from './board-title_form';
import BoardOption from './board-options';
import { Pencil } from 'lucide-react';
import { Hint } from '@/components/ui/hint';
import SearchInput from '@/components/search-input';

interface BoardNavbarProps {
  _data: Board;
}

const BoardNavbar = async ({ _data }: BoardNavbarProps) => {

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 text-white flex px-6 gap-x-4 items-center ">
      <BoardTitleFrom data={_data} />
      <Hint description="Edit title board" side="bottom" sideOffset={10}>
        <Pencil className="w-4 h-4" />
      </Hint>
      <div className="ml-auto flex gap-4">
        <SearchInput placeHolder='Search list....' />
        <BoardOption id={_data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
