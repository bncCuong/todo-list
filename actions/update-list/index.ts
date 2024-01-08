'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateList } from './schema';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { title, id, boardId } = data;

  let list;

  try {
    list = await db.list.update({
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
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: 'Error to update!' };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, hanler);
