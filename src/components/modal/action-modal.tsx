'use client';

import { CheckSquare, Copy, Hand, Square, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useAction } from '@/hooks/useActions';
import { deleteCard } from '../../../actions/delete-card';
import { copyCard } from '../../../actions/copy-card';
import { useParams } from 'next/navigation';
import { CardWithList } from '../../../types';
import { toast } from 'sonner';
import { updateCard } from '../../../actions/update-card';

const ActionsModal = ({ data, onClose }: { data: CardWithList; onClose: () => void }) => {
  const params = useParams();
  const { execute: executeDeleteCard, isLoading: deleteLoading } = useAction(deleteCard, {
    onSuccess: (_data) => {
      toast.success(`Card ${_data.title} has deleted`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
      onClose();
    },
  });
  const { execute: executeCopyCard, isLoading: copyLoading } = useAction(copyCard, {
    onSuccess: (_data) => {
      toast.success(`Card ${_data.title} has copied`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
      onClose();
    },
  });

  const { execute: executeComple, isLoading: compleLoading } = useAction(updateCard, {
    onSuccess: (_data) => {
      if (_data.completed) toast.success(`Congratulation. Card ${_data.title} completed!!`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  let loading = deleteLoading || copyLoading || compleLoading;
  const boardId = params.boardId as string;
  const id = data.id;
  const onCopyCardHanler = () => {
    executeCopyCard({ boardId, id });
  };

  const onDeleteCardHanler = () => {
    executeDeleteCard({ boardId, id });
  };

  const onCompleteHanler = () => {
    const completed = !data.completed as boolean;
    executeComple({ boardId, id, completed });
  };
  return (
    <div className="flex flex-col ml-10 md:ml-0 min-w-[120px] mt-2">
      <div className=" flex items-center gap-2 mb-4">
        <Hand className="w-4 h-4 mb-1 text-neutral-600" />
        <p className="font-semibold mb-1">Action:</p>
      </div>
      <Button disabled={loading} className="justify-start" variant="primary" onClick={onCompleteHanler}>
        {data.completed ? (
          <p className="flex items-center gap-1">
            <Square className="w-4 h-4 mr-2 " /> Incomplete
          </p>
        ) : (
          <p className="flex items-center gap-1">
            <CheckSquare className="w-4 h-4 mr-2 " /> Completed
          </p>
        )}
      </Button>
      <Button disabled={loading} className="my-1 justify-start" onClick={onCopyCardHanler}>
        <Copy className="w-4 h-4 mr-2" /> Copy
      </Button>
      <Button disabled={loading} variant="gray" onClick={onDeleteCardHanler} className="justify-start">
        <Trash className="w-4 h-4 mr-2" /> Delete
      </Button>
    </div>
  );
};

export default ActionsModal;

ActionsModal.Skeleton = function ActionsSkeleton() {
  return (
    <div className="flex flex-col ">
      <Skeleton className="w-20 h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200 my-1" />
      <Skeleton className="w-full h-8 bg-neutral-200 " />
    </div>
  );
};
