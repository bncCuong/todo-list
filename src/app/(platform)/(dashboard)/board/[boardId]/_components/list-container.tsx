'use client';
import { useEffect, useState } from 'react';
import { ListWithCard } from '../../../../../../../types';
import { ListForm } from './list-form';
import { ListItem } from './list-item';

export const ListContainer = ({ boardId, data }: { boardId: string; data: ListWithCard[] }) => {
  const [orderedList, setOrderdList] = useState(data);
  useEffect(() => {
    setOrderdList(data);
  }, [data]);
  return (
    <ol className="flex gap-x-3 w-full">
      {orderedList.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
