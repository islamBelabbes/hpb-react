import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable(),
});

export type TPost = z.infer<typeof postSchema>;
