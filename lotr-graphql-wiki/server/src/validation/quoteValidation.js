import { z } from "zod";

export const quoteSchema = z.object({
  text: z.string().min(1).max(300),
  characterId: z.string().min(1),
});

export const quoteUpdateSchema = z.object({
  text: z.string().min(1).max(300),
});
