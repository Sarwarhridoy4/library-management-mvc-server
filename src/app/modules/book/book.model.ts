// This file defines the Mongoose model for the Book entity.
// It includes the schema definition, methods, and exports the model for use in other parts of the application.
// src/modules/book/book.model.ts

import { model, Schema } from "mongoose";
import { IBookDocument } from "./book.interface";

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

bookSchema.methods.updateAvailability = function () {
  // Update the availability based on the number of copies
  this.available = this.copies > 0;
  return this.save();
};

export const Book = model<IBookDocument>("Book", bookSchema);
