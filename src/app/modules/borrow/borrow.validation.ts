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

const requiredDate = (field: string) =>
  z.coerce.date({
    error: (issue) =>
      issue.input === undefined
        ? `${field} is required`
        : `${field} must be a valid date`,
  });

export const createBorrowZodSchema = z.object({
  book: requiredString("Book ID").min(1, { error: "Book ID is required" }),
  quantity: requiredNumber("Quantity").min(1, {
    error: "At least one book must be borrowed",
  }),
  dueDate: requiredDate("Due date"),
});
