// src/modules/book/book.validation.ts
// This file defines the validation schemas for creating and updating a book using Zod.
// It uses Zod to enforce the structure and types of the data being validated.

import { z } from "zod";



export const createBookZodSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  author: z.string({ required_error: "Author is required" }),
  genre: z.string({ required_error: "Genre is required" }),
  isbn: z.string({ required_error: "ISBN is required" }),
  description: z.string().optional(),
  copies: z.number({ required_error: "Copies is required" }).int().min(0),
  available: z
    .boolean({ required_error: "Availability status is required" })
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
