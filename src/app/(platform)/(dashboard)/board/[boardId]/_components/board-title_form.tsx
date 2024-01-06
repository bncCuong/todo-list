'use client';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { updateBoard } from '../../../../../../../actions/update-board';
import { useAction } from '@/hooks/useActions';
import { toast } from 'sonner';
import { useEditTitle } from '@/hooks/useEditTitle';

export const BoardTitleFrom = ({ data }: { data: Board }) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [title, setTitle] = useState<string>(data.title);
  const { isEditing, disableEditing, enableEditting } = useEditTitle(inputRef);
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" is updated`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error: string) => {
      disableEditing();
      toast.error('Failed to updated');
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title, id: data.id });
  };

  // click outside chay func onsubmit
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          errors={fieldErrors}
          ref={inputRef}
          id="title"
          defaultValue={title}
          onBlur={onBlur}
          className="text-lg font-bold px-[7px] pt-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-white border-none "
        />
      </form>
    );
  }

  return (
    <Button variant="transparent" className="font-bold text-lg p-1 px-2 h-auto w-auto" onClick={enableEditting}>
      {title}
    </Button>
  );
};
