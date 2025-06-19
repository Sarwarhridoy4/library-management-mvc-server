// src/modules/borrow/borrow.model.ts
import { Schema, model } from "mongoose";
import { IBorrowDocument } from "./borrow.interface";

const borrowSchema = new Schema<IBorrowDocument>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Borrow = model<IBorrowDocument>("Borrow", borrowSchema);
