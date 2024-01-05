'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAction } from '@/hooks/useActions';
import { MoreHorizontal, X } from 'lucide-react';
import { deleteBoard } from '../../../../../../../actions/delete-board';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';

const BoardOption = ({ id }: { id: string }) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: (data) => {
      toast.success('Delete board successfuly');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3 relative" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">Board action</div>
        <PopoverClose asChild>
          <Button variant="ghost" className="absolute top-1 right-1">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          disabled={isLoading}
          variant="ghost"
          className="h-auto w-full p-2 px-5 justify-start font-normal text-sm"
          onClick={() => {
            execute({ id });
          }}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOption;
