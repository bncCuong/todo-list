/** @format */

import { Button } from '@/components/ui/button';
import React from 'react';
import { deleteBoard } from '../../../../../../actions/delelte-board';

interface BoardProps {
  id: string;
  title: string;
}

const Board = ({ id, title }: BoardProps) => {
  const deleBoardWithId = deleteBoard.bind(null, id);
  return (
    <form className="flex items-center gap-4" action={deleBoardWithId}>
      <p>Board title: {title}</p>
      <Button type="submit" size="sm" variant="destructive">
        Delete
      </Button>
    </form>
  );
};

export default Board;
