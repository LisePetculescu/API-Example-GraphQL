import { z } from "zod";
import { noHtml } from "./validationHelpers.js";

// export const characterSchema = z.object({
//   name: z.string().min(1).max(100),
//   race: z.string().min(1).max(50),
//   realm: z.string().max(100).optional().nullable(),
//   birthYear: z.string().max(50).optional().nullable(),
//   weapon: z.string().max(100).optional().nullable(),
//   affiliation: z.string().max(100).optional().nullable(),
//   shortDescription: z.string().min(1).max(300),
//   biography: z.string().min(1).max(3000),
//   imageUrl: z.string().url().optional().nullable(),
// });

export const characterSchema = z.object({
  name: noHtml("Name").min(1).max(100),
  race: noHtml("Race").min(1).max(50),

  realm: noHtml("Realm").max(100).optional().nullable(),
  birthYear: noHtml("Birth year").max(50).optional().nullable(),
  weapon: noHtml("Weapon").max(100).optional().nullable(),
  affiliation: noHtml("Affiliation").max(100).optional().nullable(),

  shortDescription: noHtml("Short description").min(1).max(300),
  biography: noHtml("Biography").min(1).max(3000),

  imageUrl: z.string().url().optional().nullable(),
});