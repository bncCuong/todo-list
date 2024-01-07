'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateCardOrder } from './schema';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { items, boardId } = data;

  let updatedCard;

  try {
    const transaction = items.map((card) => {
      return db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      });
    });

    updatedCard = await db.$transaction(transaction);
  } catch (error) {
    return { error: 'Failed to reorder!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCard };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, hanler);
