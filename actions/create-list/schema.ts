import { z } from 'zod';

export const CreateList = z.object({
  title: z
    .string({
      required_error: 'Title is require!',
      invalid_type_error: 'Title is require!',
    })
    .min(3, {
      message: 'Title too short!',
    }),
  boardId: z.string(),
  priority: z.optional(z.string()),
});
