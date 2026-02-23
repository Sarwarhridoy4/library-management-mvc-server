// src/modules/book/book.validation.ts
// This file defines the validation schemas for creating and updating a book using Zod.
// It uses Zod to enforce the structure and types of the data being validated.

import { z } from "zod";

const requiredString = (field: string) =>
  z.string({
    error: (issue) =>
      issue.input === undefined
        ? `${field} is required`
        : `${field} must be a string`,
  });

const requiredNumber = (field: string) =>
  z.number({
    error: (issue) =>
      issue.input === undefined
        ? `${field} is required`
        : `${field} must be a number`,
  });

const requiredBoolean = (field: string) =>
  z.boolean({
    error: (issue) =>
      issue.input === undefined
        ? `${field} is required`
        : `${field} must be a boolean`,
  });

export const createBookZodSchema = z.object({
  title: requiredString("Title"),
  author: requiredString("Author"),
  genre: requiredString("Genre"),
  isbn: requiredString("ISBN"),
  description: z.string().optional(),
  copies: requiredNumber("Copies")
    .int()
    .min(0, { error: "Copies must be a non-negative integer" }),
  available: requiredBoolean("Availability status").default(true),
});

export const updateBookZodSchema = z.object({
  title: z.string({ error: "Title must be a string" }).optional(),
  author: z.string({ error: "Author must be a string" }).optional(),
  genre: z.string({ error: "Genre must be a string" }).optional(),
  isbn: z.string({ error: "ISBN must be a string" }).optional(),
  description: z.string({ error: "Description must be a string" }).optional(),
  copies: z
    .number({ error: "Copies must be a number" })
    .int()
    .min(0, { error: "Copies must be a non-negative integer" })
    .optional(),
  available: z.boolean({ error: "Availability must be a boolean" }).optional(),
});
