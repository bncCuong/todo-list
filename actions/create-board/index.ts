'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';
import { createAuditLog } from '@/lib/create-auditLog';
import { ACTION, ENTITY_TYPE, PRIORITY } from '@prisma/client';
import { hasAvailabelCount, incrementAvailabelCount } from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthornized',
    };
  }

  //ham tra ve true hoac false xem cos the create board nua ko
  let canCreate = await hasAvailabelCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro) {
    return { error: 'You have reached your limit of free boards. Please upgrade to create more!' };
  }
  const { title, image, priority } = data;

  let _priority;
  if (priority !== undefined && PRIORITY.hasOwnProperty(priority.toUpperCase())) {
    _priority = PRIORITY[priority.toUpperCase()] as 'LOW' | 'MEDIUM' | 'HIGH' | 'FREE';
  }
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split('|');
  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return { error: 'Missing fields. Failed to create board' };
  }
  let board;
  try {
    board = await db.board.create({
      data: {
        orgId,
        title,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
        priority: _priority,
      },
    });

    if (!isPro) {
      // khoi tao va bat dau +1 board
      await incrementAvailabelCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    return {
      error: 'Something went wrong: Failed to create!!!',
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
