'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateList } from './schema';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { title, id, boardId } = data;

  let lists;

  try {
    lists = await db.list.update({
      where: {
        board: {
          orgId,
        },
        id,
        boardId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return { error: 'Error to update!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateList = createSafeAction(UpdateList, hanler);
