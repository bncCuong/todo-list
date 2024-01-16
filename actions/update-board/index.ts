'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateBoard } from './schema';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE, PRIORITY } from '@prisma/client';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { title, id, priority } = data;
  let _priority;
  if (PRIORITY.hasOwnProperty(priority.toUpperCase())) {
    _priority = PRIORITY[priority.toUpperCase()] as 'LOW' | 'MEDIUM' | 'HIGH';
  }
  let board;

  try {
    board = await db.board.update({
      where: {
        orgId,
        id,
      },
      data: {
        title,
        priority: _priority,
      },
    });
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    return { error: 'Error to update!' };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, hanler);
