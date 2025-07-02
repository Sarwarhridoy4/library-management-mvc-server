// src/modules/book/book.service.ts
import { IBookBase, IBookDocument } from "./book.interface";
import { Book } from "./book.model";
import { FilterQuery } from "mongoose";
import { IBookQuery, PaginatedBooks } from "./book.types";
import { Borrow } from "../borrow/borrow.model";

export const createBook = async (payload: IBookBase) => {
  const book = new Book(payload);
  return book.save();
};

export const getBooks = async (query: IBookQuery): Promise<PaginatedBooks> => {
  // ── Filters ──────────────────────────────────────────────────────────
  const filter: FilterQuery<IBookDocument> = {};
  if (query.filter) filter.genre = query.filter;

  // ── Sorting ──────────────────────────────────────────────────────────
  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sort === "asc" ? 1 : -1;

  // ── Pagination ───────────────────────────────────────────────────────
  const limit = Math.max(Number(query.limit) || 10, 1); // >= 1
  const page = Math.max(Number(query.page) || 1, 1); // >= 1
  const skip = (page - 1) * limit;

  // ── Queries ──────────────────────────────────────────────────────────
  const [totalItems, data] = await Promise.all([
    Book.countDocuments(filter),
    Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit),
  ]);

  const totalPages = Math.ceil(totalItems / limit) || 1;

  return {
    data,
    meta: { totalItems, totalPages, currentPage: page, limit },
  };
};

export const getBookById = async (bookId: string) => {
  return Book.findById(bookId);
};

export const updateBook = async (
  bookId: string,
  payload: Partial<IBookBase>
) => {
  const book = await Book.findByIdAndUpdate(bookId, payload, { new: true });
  if (book && typeof book.updateAvailability === "function") {
    await book.updateAvailability();
  }
  return book;
};

export const deleteBook = async (bookId: string) => {
  return Book.findByIdAndDelete(bookId);
};
// Delete borrowed records before deleting a book to avoid orphaned records
// This function is called in the deleteBook controller
// to ensure that all borrowed records related to the book are removed.
// This is necessary to maintain data integrity and avoid orphaned records in the database.
export const deleteBorrowedRecordBeforeDeleteBook = async (bookId: string) => {
  return Borrow.deleteMany({ book: bookId });
};

export const BookService = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteBorrowedRecordBeforeDeleteBook,
};
