// src/modules/book/book.validation.ts
// This file defines the validation schemas for creating and updating a book using Zod.
// It uses Zod to enforce the structure and types of the data being validated.

import { z } from "zod";

export const createBookZodSchema = z.object({
  title: z.string({ error: "Title is required" }),
  author: z.string({ error: "Author is required" }),
  genre: z.string({ error: "Genre is required" }),
  isbn: z.string({ error: "ISBN is required" }),
  description: z.string().optional(),
  copies: z.number({ error: "Copies is required" }).int().min(0),
  available: z
    .boolean({ error: "Availability status is required" })
    .default(true),
});

export const updateBookZodSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.string().optional(),
  isbn: z.string().optional(),
  description: z.string().optional(),
  copies: z.number().int().min(0).optional(),
  available: z.boolean().optional(),
});
