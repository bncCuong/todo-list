'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteBoard } from './schema';
import { redirect } from 'next/navigation';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { decreaseAvailabelCount } from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';

const hanler = async (data: InputType): Promise<ReturnType> => {
  const isPro = await checkSubscription();
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return { error: 'Unauthorized' };
  }

  const { id } = data;

  let board;

  try {
    board = await db.board.delete({
      where: {
        orgId,
        id,
      },
    });
    if (!isPro) {
      await decreaseAvailabelCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    return { error: 'Error to delete!' };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, hanler);
