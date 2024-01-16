import { z } from 'zod';

export const UpdateBoard = z.object({
  title: z.optional(
    z
      .string({
        required_error: 'Title is require',
        invalid_type_error: 'title is require',
      })
      .min(3, {
        message: 'Title too short!',
      }),
  ),
  id: z.string(),
  priority: z.optional(z.string()),
});
