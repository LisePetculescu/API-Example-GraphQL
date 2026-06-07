import { z } from "zod";

export const characterSchema = z.object({
  name: z.string().min(1).max(100),
  race: z.string().min(1).max(50),
  realm: z.string().max(100).optional().nullable(),
  birthYear: z.string().max(50).optional().nullable(),
  weapon: z.string().max(100).optional().nullable(),
  affiliation: z.string().max(100).optional().nullable(),
  shortDescription: z.string().min(1).max(300),
  biography: z.string().min(1).max(3000),
  imageUrl: z.string().url().optional().nullable(),
});
