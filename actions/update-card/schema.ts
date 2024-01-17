import { z } from 'zod';

export const UpdateCard = z.object({
  title: z.optional(
    z
      .string({
        required_error: 'Title is require!',
        invalid_type_error: 'Title is require!',
      })
      .min(3, {
        message: 'Title too short!',
      }),
  ),
  description: z.optional(
    z
      .string({
        required_error: 'Description is require!',
        invalid_type_error: 'Description is require!',
      })
      .min(3, {
        message: 'Description too short!',
      }),
  ),
  boardId: z.string(),
  id: z.string(),
  completed: z.optional(z.boolean()),
});
