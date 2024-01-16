import { auth } from '@clerk/nextjs';
import { Board } from '@prisma/client';
import { BoardTitleFrom } from './board-title_form';
import BoardOption from './board-options';
import { Pencil } from 'lucide-react';
import { Hint } from '@/components/ui/hint';
import SearchInput from '@/components/search-input';
import { cn } from '@/lib/utils';

interface BoardNavbarProps {
  _data: Board;
}

const BoardNavbar = async ({ _data }: BoardNavbarProps) => {
  return (
    <div
      className={cn(
        'w-full h-14 z-[40] bg-black/50 fixed top-14 text-white flex px-6 gap-x-4 items-center justify-between',
        _data.priority === 'MEDIUM'
          ? 'bg-gradient-to-r from-emerald-500 to-lime-600'
          : _data.priority === 'HIGH'
          ? 'bg-gradient-to-br from-pink-500 via-pink-400 to-purple-800'
          : '',
      )}
    >
      <div>
        <BoardTitleFrom data={_data} />
        <Hint description="Edit title board" side="bottom" sideOffset={10}>
          <Pencil className="w-4 h-4" />
        </Hint>
      </div>

      {_data.priority && <h2 className="font-bold">Priority: {_data.priority}</h2>}

      <div className=" flex gap-4">
        <SearchInput placeHolder="Search list...." />
        <BoardOption id={_data.id} _priority={_data.priority} />
      </div>
    </div>
  );
};

export default BoardNavbar;
