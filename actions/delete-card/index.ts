'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteCard } from './schema';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { id, boardId } = data;
  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: { orgId },
        },
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return { error: 'Failed to delete card!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, hanler);
