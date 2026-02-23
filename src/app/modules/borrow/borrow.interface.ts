import type { HydratedDocument, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export type IBorrowDocument = HydratedDocument<IBorrow>;
