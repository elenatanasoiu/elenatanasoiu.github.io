import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

const creativeWriting = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/creative-writing" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog, "creative-writing": creativeWriting };
