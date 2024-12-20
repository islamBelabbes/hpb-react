import { z } from "zod";

export const definedBlocksSchema = z.enum([
  "lazyblock/testimonials",
  "lazyblock/music-list",
]);

export const testimonialsSchema = z.object({
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
  testimonial: z.string(),
});

export const musicListSchema = z.object({
  "artist-name": z.string(),
  "song-name": z.string(),
  "song-picture": z.string(),
  "song-description": z.string(),
});

export type TDefinedBlocks = z.infer<typeof definedBlocksSchema>;
export type TTestimonials = z.infer<typeof testimonialsSchema>;
export type TMusicList = z.infer<typeof musicListSchema>;
