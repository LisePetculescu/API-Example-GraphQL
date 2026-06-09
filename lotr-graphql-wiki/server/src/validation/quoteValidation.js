import { z } from "zod";
import { noHtml } from "./validationHelpers.js";

// export const quoteSchema = z.object({
//   text: z.string().min(1).max(300),
//   characterId: z.string().min(1),
// });

// export const quoteUpdateSchema = z.object({
//   text: z.string().min(1).max(300),
// });

export const quoteSchema = z.object({
  text: noHtml("Quote text").min(1).max(300),
  characterId: z.string().min(1),
});

export const quoteUpdateSchema = z.object({
  text: noHtml("Quote text").min(1).max(300),
});