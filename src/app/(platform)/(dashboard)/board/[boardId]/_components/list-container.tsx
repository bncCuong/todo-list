'use client';
import { useEffect, useState } from 'react';
import { ListWithCard } from '../../../../../../../types';
import { ListForm } from './list-form';
import { ListItem } from './list-item';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export const ListContainer = ({ boardId, data }: { boardId: string; data: ListWithCard[] }) => {
  const [orderedData, setOrderdData] = useState(data);
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
      //TODO: server action
    }

    //user moving a card
    if (type === 'card') {
      let newOrderedData = [...orderedData];

      //source and destination list
      const sourceList = newOrderedData.find((list) => list.id === source.droppableId);

      const destList = newOrderedData.find((list) => list.id === destination.draggableId);

      if (!sourceList || !destList) return;

      //check if cards exists on the sourceList
      if (!sourceList.cards) sourceList.cards = [];

      if (!destList.cards) destList.cards = [];
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
