import { List } from '@prisma/client';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Copy, MoreHorizontal, Plus, Trash, X } from 'lucide-react';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@radix-ui/react-separator';
import { useAction } from '@/hooks/useActions';
import { deleteList } from '../../../../../../../actions/delete-list';
import { toast } from 'sonner';
import { copyList } from '../../../../../../../actions/copy-list';
import { ElementRef, useRef } from 'react';

interface ListOptionProps {
  data: List;
  onAddCard: () => void;
}

const ListOption = ({ data, onAddCard }: ListOptionProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  //delete list
  const { execute: deleteListHanler } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} has been deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  //copy list
  const { execute: copyListHanler } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} has copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopyListSubmit = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    copyListHanler({ id, boardId });
  };
  const onDeleListSubmit = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    deleteListHanler({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="center">
        <div className="text-sm font-medium text-center text-neutral-500 pb-4">List actions</div>
        <PopoverClose asChild>
          <Button ref={closeRef} className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          <Plus className="w-4 h-4 text-neutral-600 mr-2" />
          Add card
        </Button>
        <form action={onCopyListSubmit}>
          <input onChange={() => {}} hidden id="id" name="id" value={data.id} />
          <input onChange={() => {}} hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" variant="ghost">
            <Copy className="w-4 h-4 text-neutral-600 mr-2" />
            Copy list
          </FormSubmit>
        </form>
        <Separator className="bg-black/20 h-[2px] " />
        <form action={onDeleListSubmit}>
          <input onChange={() => {}} hidden id="id" name="id" value={data.id} />
          <input onChange={() => {}} hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" variant="ghost">
            <Trash className="w-4 h-4 text-neutral-600 mr-2" />
            Delete list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOption;
