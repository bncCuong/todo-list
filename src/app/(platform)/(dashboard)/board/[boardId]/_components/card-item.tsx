'use client';

import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from '@/hooks/useCardModal';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardItemProps {
  index: number;
  data: Card;
}
const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provider) => (
        <div
          onClick={() => cardModal.onOpen(data.id)}
          {...provider.dragHandleProps}
          {...provider.draggableProps}
          ref={provider.innerRef}
          role="button"
          className={cn(
            'truncate border-2 border-transparent mt-2 hover:border-black/50 py-2 px-3 text-sm bg-white rounded-md shadow-sm flex items-center justify-between font-semibold ',
            data.completed ? 'line-through text-pink-700 hover:border-pink-600/50' : '',
          )}
        >
          {data.title}
          {data.completed && <CheckCircle className="w-4 h-4" />}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
