'use client';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAction } from '@/hooks/useActions';
import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { Button } from '../ui/button';
import { Loader2, X } from 'lucide-react';
import { createBoard } from '../../../actions/create-board';
import { toast } from 'sonner';
import { FormPicker } from './form-picker';
import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface PopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

export const FormPopover = ({ children, align, side = 'bottom', sideOffset = 1 }: PopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Create Successfuly');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    if (title === '') {
      toast.warning('Title could not be empty');
      return;
    }
    if (!image) {
      toast.warning('Pick someone image first!');
      return;
    }
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium pb-4 text-center text-neutral-600">Create Board</div>
        <PopoverClose ref={closeRef} asChild>
          <Button className="h-auto w-auto absolute top-[2px] right-[2px] text-neutral-600" variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4 overflow-y-auto">
          <FormPicker id="image" errors={fieldErrors} />
          <div className="space-y-4">
            <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
