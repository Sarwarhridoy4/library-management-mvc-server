// src/modules/borrow/borrow.service.ts
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

const borrowBook = async (bookId: string, quantity: number, dueDate: Date) => {
  const targetBook = await Book.findById(bookId);
  if (!targetBook) throw new Error("Book not found");

  if (targetBook.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  targetBook.copies -= quantity;
  await targetBook.updateAvailability();

  const borrowed = await Borrow.create({ book: bookId, quantity, dueDate });
  return borrowed;
};

const getBorrowSummary = async () => {
  return Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);
};

export const BorrowService = {
  borrowBook,
  getBorrowSummary,
};
