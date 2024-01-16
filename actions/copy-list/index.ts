'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CopyList } from './schema';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { id, boardId } = data;

  let list;

  try {
    const listCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: { orgId },
      },
      include: {
        cards: true,
      },
    });

    if (!listCopy) {
      return { error: 'Failed to copy list' };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: { order: 'desc' },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        boardId: listCopy.boardId,
        title: `${listCopy.title} - Copy`,
        order: newOrder,
        priority: listCopy.priority,
        cards: {
          createMany: {
            data: listCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: 'Error to copy!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, hanler);
