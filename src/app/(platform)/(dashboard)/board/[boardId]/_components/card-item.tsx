'use client';

import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from '@/hooks/useCardModal';

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
          className="truncate border-2 border-transparent mt-2 hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
