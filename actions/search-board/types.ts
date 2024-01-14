import { z } from 'zod';
import { Board } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { SearchBoard } from './schema';

export type InputType = z.infer<typeof SearchBoard>;
export type ReturnType = ActionState<InputType, Board[]>;
