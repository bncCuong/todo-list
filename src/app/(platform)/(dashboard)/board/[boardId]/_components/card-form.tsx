import { FormSubmit } from '@/components/form/form-submit';
import FormTextArea from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useActions';
import { Plus, X } from 'lucide-react';
import React, { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react';
import { createCard } from '../../../../../../../actions/create-card';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface CardFormProp {
  listId: string;
  isEditing: boolean;
  enableEditting: () => void;
  disableEditing: () => void;
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProp>(
  ({ disableEditing, enableEditting, listId, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`The card ${data.title} created`);
        formRef.current?.reset();
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'escape') {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmitTextAreaHanler = (formData: FormData) => {
      const title = formData.get('title') as string;
      const listId = formData.get('listId') as string;
      const boardId = params.boardId as string;
      execute({ title, listId, boardId });
    };
    if (isEditing) {
      return (
        <form action={onSubmitTextAreaHanler} ref={formRef} className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id="title"
            ref={ref}
            placeholder="Enter a title for this card..."
            onKeyDown={onTextAreaKeyDown}
            errors={fieldErrors}
          />
          <input onChange={() => {}} hidden id="listId" name="listId" value={listId} />
          <div className="inline-flex items-center gap-x-1">
            <FormSubmit variant="gradient">Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-4 h-4 mb-1" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditting}
          size="sm"
          variant="ghost"
          className="h-auto px-2 py1.5 w-full justify-start text-muted-foreground text-sm"
        >
          <Plus className="h-4 w-4" />
          Add a card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = 'CardForm';

export default CardForm;
