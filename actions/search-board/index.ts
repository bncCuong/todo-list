'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { SearchBoard } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthornized',
    };
  }

  const { textSearch } = data;

  let _searchBoard;
  try {
    _searchBoard = await db.board.findMany({
      where: { orgId, title: { contains: textSearch } },
    });
  } catch (error) {
    return {
      error: 'Something went wrong: Failed to create!!!',
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: _searchBoard };
};

export const searchBoard = createSafeAction(SearchBoard, handler);
