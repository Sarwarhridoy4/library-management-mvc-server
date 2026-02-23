// This file defines the Mongoose model for the Book entity.
// It includes the schema definition, methods, and exports the model for use in other parts of the application.
// src/modules/book/book.model.ts

import { model, Schema } from "mongoose";
import type {
  BookDocument,
  BookModel,
  IBookBase,
  IBookMethods,
} from "./book.interface";

const bookSchema = new Schema<IBookBase, BookModel, IBookMethods>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    methods: {
      updateAvailability(this: BookDocument) {
        this.available = this.copies > 0;
        return this.save();
      },
    },
  }
);

export const Book = model<IBookBase, BookModel>("Book", bookSchema);
