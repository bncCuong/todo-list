import { db } from './db';
import { ENTITY_TYPE, ACTION } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs';

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  const { orgId } = auth();
  const user = await currentUser();
  if (!user || !orgId) throw new Error('User not found!');
  const { action, entityId, entityTitle, entityType } = props;

  await db.auditLog.create({
    data: {
      orgId,
      entityId,
      action,
      entityTitle,
      entityType,
    },
  });
  try {
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
