'use client';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAction } from '@/hooks/useActions';
import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { createBoard } from '../../../actions/create-board';
import { toast } from 'sonner';

interface PopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

export const FormPopover = ({ children, align, side = 'bottom', sideOffset = 1 }: PopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success('Create Successfuly');
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    if (title === '') {
      return;
    }
    execute({ title });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium pb-4 text-center text-neutral-600">Create Board</div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto absolute top-[2px] right-[2px] text-neutral-600" variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
          </div>
          <FormSubmit children="Create" className="w-full" />
        </form>
      </PopoverContent>
    </Popover>
  );
};
