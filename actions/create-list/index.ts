'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateList } from './schema';
import { error } from 'console';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { title, boardId } = data;

  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        orgId,
        id: boardId,
      },
    });

    if (!board) {
      return { error: 'Board not found' };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: 'Error to update!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, hanler);
