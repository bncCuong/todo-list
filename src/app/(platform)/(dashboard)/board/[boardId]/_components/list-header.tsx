import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/useActions';
import { useEditTitle } from '@/hooks/useEditTitle';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { updateList } from '../../../../../../../actions/update-list';
import { toast } from 'sonner';

export const ListHeader = ({ data }: { data: List }) => {
  const [title, setTitle] = useState(data.title);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);
  const { isEditing, disableEditing, enableEditting, onKeyDown } = useEditTitle(formRef, inputRef);
  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Title list ${data.title} updated`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
      disableEditing();
    },
  });

  useEventListener('keydown', onKeyDown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;
    const id = data.id;
    if (title === data.title) {
      return disableEditing();
    }
    execute({ title, boardId, id });
  };

  return (
    <div className="pt-2 px-2 flex justify-between items-start text-sm font-semibold gap-x-2">
      {isEditing ? (
        <form action={onSubmit} className="flex-1 px-[2px]" ref={formRef}>
          <input hidden id="id" name="id" value={data.id} onChange={() => {}} />
          <input hidden id="boardId" name="boardId" value={data.boardId} onChange={() => {}} />
          <FormInput
            ref={inputRef}
            onBlur={disableEditing}
            placeholder="Enter list title..."
            id="title"
            defaultValue={data.title}
          />
        </form>
      ) : (
        <div onClick={enableEditting} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
          {title}
        </div>
      )}
    </div>
  );
};
