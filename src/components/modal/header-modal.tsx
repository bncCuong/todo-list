/* eslint-disable react/display-name */
'use client';
import { ElementRef, useRef, useState } from 'react';
import { Layout } from 'lucide-react';
import { CardWithList } from '../../../types';
import { FormInput } from '../form/form-input';
import { Skeleton } from '../ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAction } from '@/hooks/useActions';
import { updateCard } from '../../../actions/update-card';
import { toast } from 'sonner';

const HeaderModal = ({ data, onClose }: { data: CardWithList; onClose: () => void }) => {
  const [title, setTitle] = useState<string>(data?.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ['card', _data.id] });
      queryClient.invalidateQueries({ queryKey: ['card-logs', _data.id] });
      toast.success(`Updated name to "${_data.title}" `);
      setTitle(_data.title);
    },
    onError: (error) => {
      toast.error(error);
      onClose();
    },
  });

  const onSubmitHanler = (formData: FormData) => {
    const title = formData.get('title') as string;
    if (title === data.title) return;
    const boardId = params.boardId as string;
    const id = data.id;

    execute({ title, boardId, id });
  };
  return (
    <div className="flex gap-x-3 mb-6 w-full items-start">
      <Layout className="w-6 h-6 mt-1 text-neutral-600" />
      <div className="w-full">
        <form action={onSubmitHanler}>
          <FormInput
            errors={fieldErrors}
            onBlur={onBlur}
            ref={inputRef}
            defaultValue={title}
            id="title"
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">in list {data.list.title}</p>
      </div>
    </div>
  );
};

export default HeaderModal;

HeaderModal.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="w-6 h-6 mt-1 bg-neutral-200" />
      <div className="flex gap-2 flex-col">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-24 h-6  bg-neutral-200" />
      </div>
    </div>
  );
};
