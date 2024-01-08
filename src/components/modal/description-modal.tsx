'use client';

import { AlignLeft } from 'lucide-react';
import { CardWithList } from '../../../types';
import { Skeleton } from '../ui/skeleton';
import { ElementRef, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useEditTitleArea } from '@/hooks/useEditTitle-area';
import FormTextArea from '../form/form-textarea';
import { FormSubmit } from '../form/form-submit';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/useActions';
import { updateCard } from '../../../actions/update-card';
import { toast } from 'sonner';

export const DescriptionModal = ({ data }: { data: CardWithList }) => {
  const areaRef = useRef<ElementRef<'textarea'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const params = useParams();
  const queryClient = useQueryClient();
  const { isEditing, disableEditing, enableEditting, onKeyDown } = useEditTitleArea(areaRef);

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (_data) => {
      toast.success(`Added the description in card ${_data.title}`);
      queryClient.invalidateQueries({
        queryKey: ['card', _data.id],
      });
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmitHanler = (formData: FormData) => {
    const description = formData.get('description') as string;
    if (!description) return;
    const boardId = params.boardId as string;
    const id = data.id;
    execute({ description, boardId, id });
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="w-4 h-4 mr-2 text-neutral-700 mt-1" />
      <div className="w-full">
        <p className="font-semibold ">Description</p>
        {isEditing ? (
          <form action={onSubmitHanler} ref={formRef} className="space-y-2">
            <FormTextArea
              ref={areaRef}
              errors={fieldErrors}
              id="description"
              className="w-full mt-2 "
              placeholder="Add more detailed description..."
              defaultValue={data.description || undefined}
            />
            <div className="flex gap-2 justify-end">
              <FormSubmit className="px-4">Save</FormSubmit>
              <Button type="button" className="" variant="ghost" onClick={disableEditing}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditting}
            role="button"
            className="min-h-[85px] bg-neutral-200 text-sm font-medium p-3 rounded-md mt-2"
          >
            {data.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  );
};

DescriptionModal.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="w-6 h-6 mt-1 bg-neutral-200" />
      <div className="flex gap-2 flex-col">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[80px]  bg-neutral-200" />
      </div>
    </div>
  );
};
