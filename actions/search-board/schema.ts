/** @format */

import { z } from 'zod';

export const SearchBoard = z.object({
  textSearch: z.string(),
});
