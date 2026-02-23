import type { HydratedDocument, Model } from "mongoose";

export type IBookBase = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

export interface IBookMethods {
  updateAvailability(
    this: HydratedDocument<IBookBase, IBookMethods>
  ): Promise<HydratedDocument<IBookBase, IBookMethods>>;
}

export type BookDocument = HydratedDocument<IBookBase, IBookMethods>;

export type BookModel = Model<IBookBase, {}, IBookMethods>;

export interface PaginatedBooks {
  data: IBookBase[]; // <- exactly what the UI wants
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
