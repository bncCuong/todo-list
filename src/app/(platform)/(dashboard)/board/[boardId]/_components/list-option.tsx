'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';
import { List } from '@prisma/client';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Copy, Hammer, MoreHorizontal, Plus, Trash, X } from 'lucide-react';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@radix-ui/react-separator';
import { useAction } from '@/hooks/useActions';
import { toast } from 'sonner';
import LoadingBar from 'react-top-loading-bar';
import FormRadio from '@/components/form/form-radio';
import { deleteList } from '../../../../../../../actions/delete-list';
import { copyList } from '../../../../../../../actions/copy-list';
import { updateList } from '../../../../../../../actions/update-list';

interface ListOptionProps {
  data: List;
  onAddCard: () => void;
}

const ListOption = ({ data, onAddCard }: ListOptionProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [progress, setProgress] = useState(0);

  //Change priority
  const { execute: changePriority } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Priority of list ${data.title} changed`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

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

  const onChangePriority = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    const priority = formData.get('priority') as string;
    if (priority === undefined || priority === null) {
      toast.error('Choose priority!');
      return;
    }
    if (data.priority === priority.toUpperCase()) {
      toast.error(`Current Priority is "${priority.toUpperCase()}"`);
      return;
    }
    changePriority({ id, boardId, priority });
  };
  return (
    <Popover>
      <LoadingBar
        color="#f11946"
        loaderSpeed={2500}
        transitionTime={2000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 mb-2" variant="ghost">
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
        <form action={onChangePriority}>
          <input onChange={() => {}} hidden id="id" name="id" value={data.id} />
          <input onChange={() => {}} hidden id="boardId" name="boardId" value={data.boardId} />
          <FormRadio id="priority" className="mx-6 w-[220px]" currentPriority={data.priority} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            setProgress={setProgress}
          >
            <Hammer className="w-4 h-4 text-neutral-600 mr-2" />
            Save
          </FormSubmit>
        </form>
        <Separator className="bg-black/20 h-[2px] my-1 " />
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
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
            setProgress={setProgress}
          >
            <Copy className="w-4 h-4 text-neutral-600 mr-2" />
            Copy list
          </FormSubmit>
        </form>
        <Separator className="bg-black/20 h-[2px] my-1 " />
        <form action={onDeleListSubmit}>
          <input onChange={() => {}} hidden id="id" name="id" value={data.id} />
          <input onChange={() => {}} hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
            setProgress={setProgress}
          >
            <Trash className="w-4 h-4 text-neutral-600 mr-2" />
            Delete list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOption;
