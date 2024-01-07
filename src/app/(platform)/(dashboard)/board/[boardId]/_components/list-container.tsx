'use client';
import { useEffect, useState } from 'react';
import { ListWithCard } from '../../../../../../../types';
import { ListForm } from './list-form';
import { ListItem } from './list-item';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useAction } from '@/hooks/useActions';
import { updateListOrder } from '../../../../../../../actions/update-list-order';
import { toast } from 'sonner';
import { updateCardOrder } from '../../../../../../../actions/update-card-order';
export const ListContainer = ({ boardId, data }: { boardId: string; data: ListWithCard[] }) => {
  const [orderedData, setOrderdData] = useState(data);
  const { execute: executeListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List reordered');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('Card reordered');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderdData(data);
  }, [data]);

  function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const inDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    //if dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    //user moving a list
    if (type === 'list') {
      const items = reOrder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        order: index,
      }));

      setOrderdData(items);
      executeListOrder({ items, boardId });
    }

    //user moving a card
    if (type === 'card') {
      let newOrderedData = [...orderedData];

      //source and destination list
      const sourceList = newOrderedData.find((list) => list.id === source.droppableId);

      const destList = newOrderedData.find((list) => list.id === destination.droppableId);

      if (!sourceList || !destList) return;

      //check if cards exists on the sourceList
      if (!sourceList.cards) sourceList.cards = [];

      //check if cards exists on the destList
      if (!destList.cards) destList.cards = [];

      // moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reOrder(sourceList.cards, source.index, destination.index);

        reorderedCard.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCard;

        setOrderdData(newOrderedData);
        executeCardOrder({
          boardId,
          items: reorderedCard,
        });
      } else {
        // moving the card in the another list
        //remove card form the source list
        const [moveCard] = sourceList.cards.splice(source.index);

        //assign the new listId to the moved card
        moveCard.listId = destination.droppableId;

        //add card to the destination list
        destList.cards.splice(destination.index, 0, moveCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        //update the order for each card in the destination list
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderdData(newOrderedData);

        executeCardOrder({
          boardId,
          items: destList.cards,
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={inDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 w-full">
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
