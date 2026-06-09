import { z } from "zod";

export const noHtml = (fieldName) =>
  z.string().refine((value) => !/[<>]/.test(value), {
    message: `${fieldName} cannot contain HTML tags`,
  });
