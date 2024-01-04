/** @format */

import { z } from 'zod';

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: 'Title is require!',
      invalid_type_error: 'Title is require!',
    })
    .min(3, {
      message: 'Title too short!',
    }),

  image: z.string({
    required_error: 'Image is require',
    invalid_type_error: 'Image is require',
  }),
});
