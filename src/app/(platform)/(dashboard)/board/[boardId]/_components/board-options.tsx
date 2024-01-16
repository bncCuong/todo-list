'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAction } from '@/hooks/useActions';
import { Hammer, MoreHorizontal, Save, SaveIcon, Trash, X } from 'lucide-react';
import { deleteBoard } from '../../../../../../../actions/delete-board';
import { toast } from 'sonner';
import FormCheckBox from '@/components/form/form-checkbox';
import { updateBoard } from '../../../../../../../actions/update-board';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';
import FormRadio from '@/components/form/form-radio';

const BoardOption = ({ id, _priority }: { id: string; _priority?: string | null }) => {
  const { execute: deleExcute, isLoading: deleLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success('Delete board successfuly');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: _updateBoard, isLoading: updateLoading } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Priority of ${data.title} updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmitPriority = (formData: FormData) => {
    const priority = formData.get('priority') as string;
    if (priority.toUpperCase() === _priority) {
      toast.warning(`Priority of current board is "${_priority}"`);
      return;
    }
    _updateBoard({ id, priority });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3 relative mr-6 " side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">Board action</div>
        <PopoverClose asChild>
          <Button variant="ghost" className="absolute top-1 right-1">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmitPriority} className="h-auto w-full">
          <FormRadio id="priority" className="px-5" />
          <FormSubmit variant="ghost" className="w-full  mb-2 justify-start font-normal text-base">
            <Hammer className="w-4 h-4 mx-1 text-neutral-600" />
            Save Priority
          </FormSubmit>
        </form>
        <Separator />
        <Button
          disabled={deleLoading}
          variant="ghost"
          className="h-auto w-full px-5 justify-start font-normal text-base mt-2"
          onClick={() => {
            deleExcute({ id });
          }}
        >
          <Trash className="w-4 h-4 mr-1 text-neutral-600" />
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOption;
