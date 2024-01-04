'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';
import { error } from 'console';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Unauthornized',
    };
  }
  const { title } = data;
  if (title === '') return { error: 'Title cant be empty' };
  let board;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: 'Something went wrong: Failed to create!!!',
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
