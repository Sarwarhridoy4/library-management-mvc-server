import type { BookDocument } from "./book.interface";

// This file defines the types and interfaces for the book module.
// This code wont be used anymore, because genre aren't limited anymore.
// export type Genre =
//   | "FICTION"
//   | "NON_FICTION"
//   | "SCIENCE"
//   | "HISTORY"
//   | "BIOGRAPHY"
//   | "FANTASY";

export type IBookQuery = {
  filter?: string; // e.g., genre
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number; // items per page
  page?: number; // page number, 1‑based
};

export type PaginatedBooks = {
  data: BookDocument[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};
