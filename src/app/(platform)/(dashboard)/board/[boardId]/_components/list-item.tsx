import { ListWithCard } from '../../../../../../../types';
import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';
import CardForm from './card-form';
import { cn } from '@/lib/utils';
import CardItem from './card-item';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

export const ListItem = ({ data, index }: { data: ListWithCard; index: number }) => {
  const areaRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditting = () => {
    setIsEditing(true);
    setTimeout(() => {
      areaRef.current?.focus();
      areaRef.current?.select();
    });
  };

  if (isEditing) {
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'escape') {
      disableEditing();
    }
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li {...provided.dragHandleProps} ref={provided.innerRef} className="shrink-0 w-[250px] select-none">
          <div {...provided.draggableProps} className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2 overflow-hidden">
            <ListHeader onAddCard={enableEditting} data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn('mx-1 px-1 py0.5 flex-col gap-y-2', data.cards.length > 0 ? 'mt-2' : 'mt-0')}
                >
                  {data.cards.map((card, index) => {
                    return <CardItem key={card.id} index={index} data={card} />;
                  })}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              isEditing={isEditing}
              ref={areaRef}
              enableEditting={enableEditting}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
