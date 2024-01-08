'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CopyCard } from './schema';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { id, boardId } = data;

  let updateCard;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!cardToCopy) {
      return { error: 'Card not found!' };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    updateCard = await db.card.create({
      data: {
        title: `${cardToCopy.title} - copy`,
        description: cardToCopy.description,
        listId: cardToCopy.listId,
        order: newOrder,
      },
    });
  } catch (error) {
    return { error: 'Failed to update card!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updateCard };
};

export const copyCard = createSafeAction(CopyCard, hanler);
