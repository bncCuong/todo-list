import { auth } from '@clerk/nextjs';
import { db } from './db';
import { BOARD_FREE } from '@/constant';

// khoi? tao va tang dan so luong board
export const incrementAvailabelCount = async () => {
  const { orgId } = auth();

  if (!orgId) return { error: 'Unauthorized' };

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

// giam so luong board
export const decreaseAvailabelCount = async () => {
  const { orgId } = auth();

  if (!orgId) return { error: 'Unauthorized' };

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailabelCount = async () => {
  const { orgId } = auth();

  if (!orgId) return { error: 'Unauthorized' };

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit || orgLimit.count < BOARD_FREE) {
    return true;
  } else {
    return false;
  }
};

export const getAvailabelCount = async () => {
  const { orgId } = auth();
  if (!orgId) return 0;

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
