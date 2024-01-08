import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/useActions';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { updateList } from '../../../../../../../actions/update-list';
import { toast } from 'sonner';
import ListOption from './list-option';
import { useEditTitleInput } from '@/hooks/useEditTitle-input';

export const ListHeader = ({ data, onAddCard }: { data: List; onAddCard: () => void }) => {
  const [title, setTitle] = useState(data.title);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);
  const { isEditing, disableEditing, enableEditting, onKeyDown } = useEditTitleInput(inputRef);
  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Rename to "${data.title}" `);
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

  // click outside chay func onsubmit
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 flex justify-between items-start text-sm font-semibold gap-x-2">
      {isEditing ? (
        <form action={onSubmit} className="flex-1 px-[2px]" ref={formRef}>
          <input hidden id="id" name="id" value={data.id} onChange={() => {}} />
          <input hidden id="boardId" name="boardId" value={data.boardId} onChange={() => {}} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            placeholder="Enter list title..."
            id="title"
            defaultValue={data.title}
          />

          <button hidden type="submit" />
        </form>
      ) : (
        <div onClick={enableEditting} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
          {title}
        </div>
      )}
      <ListOption data={data} onAddCard={onAddCard} />
    </div>
  );
};
