'use client';

import { Copy, Hand, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useAction } from '@/hooks/useActions';
import { deleteCard } from '../../../actions/delete-card';
import { copyCard } from '../../../actions/copy-card';
import { useParams } from 'next/navigation';
import { CardWithList } from '../../../types';
import { toast } from 'sonner';

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

  let loading = deleteLoading || copyLoading;
  const boardId = params.boardId as string;
  const id = data.id;
  const onCopyCardHanler = () => {
    executeCopyCard({ boardId, id });
  };

  const onDeleteCardHanler = () => {
    executeDeleteCard({ boardId, id });
  };
  return (
    <div className="flex flex-col ml-10 md:ml-0 min-w-[120px]">
      <div className=" flex items-center gap-2">
        <Hand className="w-4 h-4 mb-1" />
        <p className="font-semibold mb-1">Action:</p>
      </div>
      <Button disabled={loading} className="my-1" onClick={onCopyCardHanler}>
        <Copy className="w-4 h-4 mr-2" /> Copy
      </Button>
      <Button disabled={loading} variant="gray" onClick={onDeleteCardHanler}>
        <Trash className="w-4 h-4 mr-2" /> Delete
      </Button>
    </div>
  );
};

export default ActionsModal;

// eslint-disable-next-line react/display-name
ActionsModal.Skeleton = () => {
  return (
    <div className="flex flex-col ">
      <Skeleton className="w-20 h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200 my-1" />
      <Skeleton className="w-full h-8 bg-neutral-200 " />
    </div>
  );
};
