'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteList } from './schema';
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
    list = await db.list.delete({
      where: {
        boardId,
        id,
        board: { orgId },
      },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: 'Error to delete!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, hanler);
