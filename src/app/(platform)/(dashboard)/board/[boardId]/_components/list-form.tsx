'use client';

import { Plus, X } from 'lucide-react';
import { ListWrapper } from './list-wraper';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { FormInput } from '@/components/form/form-input';
import { useParams, useRouter } from 'next/navigation';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useActions';
import { createList } from '../../../../../../../actions/create-list';
import { toast } from 'sonner';
import { useEditTitleInput } from '@/hooks/useEditTitle-input';

export const ListForm = () => {
  const params = useParams();
  const router = useRouter();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { isEditing, disableEditing, enableEditting, onKeyDown } = useEditTitleInput(inputRef);

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} created!`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
      disableEditing();
    },
  });

  const onSubmit = (formData: FormData) => {
    const boardId = formData.get('boardId') as string;
    const title = formData.get('title') as string;
    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form action={onSubmit} ref={formRef} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1.5 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" onChange={() => {}} />
          <div className="flex items-center gap-1">
            <FormSubmit variant="gradient">Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-4 h-4 " />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        className="w-full p-3 space-y-4 bg-white/80 rounded-md shadow-md flex items-center text-sm font-medium hover:bg-white/50"
        onClick={enableEditting}
      >
        <Plus className="w-4 h-4 mr-2" /> Add a list
      </button>
    </ListWrapper>
  );
};
