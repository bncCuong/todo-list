import { z } from 'zod';

export const UpdateBoard = z.object({
  title: z
    .string({
      required_error: 'Title is require!',
      invalid_type_error: 'Title is require!',
    })
    .min(3, {
      message: 'Title too short!',
    }),
  id: z.string(),
});
