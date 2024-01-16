import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/useActions';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { updateList } from '../../../../../../../actions/update-list';
import { toast } from 'sonner';
import ListOption from './list-option';
import { useEditTitleInput } from '@/hooks/useEditTitle-input';
import { Pencil } from 'lucide-react';
import { Hint } from '@/components/ui/hint';
import { cn } from '@/lib/utils';

export const ListHeader = ({ data, onAddCard }: { data: List; onAddCard: () => void }) => {
  const [title, setTitle] = useState(data.title);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);
  const { isEditing, disableEditing, enableEditting, onKeyDown } = useEditTitleInput(inputRef);
  const { execute } = useAction(updateList, {
    onSuccess: (_data) => {
      toast.success(`Rename to "${_data.title}" `);
      setTitle(_data.title);
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
    if (title === '') {
      toast.warning('Title is require!');
      return;
    }
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
    <div
      className={cn(
        'pt-2 px-2 flex justify-between items-start text-sm font-semibold gap-x-2',
        data.priority === 'MEDIUM'
          ? 'bg-gradient-to-r from-emerald-500 to-lime-600'
          : data.priority === 'HIGH'
          ? 'bg-gradient-to-br from-pink-500 via-pink-400 to-purple-800'
          : 'bg-black/50 ',
      )}
    >
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
            className="mb-2"
          />

          <button hidden type="submit" />
        </form>
      ) : (
        <div onClick={enableEditting} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent ">
          {title}
          <Hint description="Edit title board" side="bottom" sideOffset={10}>
            <Pencil className="w-3 h-3 ml-2" />
          </Hint>
        </div>
      )}
      <ListOption data={data} onAddCard={onAddCard} />
    </div>
  );
};
