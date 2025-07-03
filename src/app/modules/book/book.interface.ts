export interface IBookMethods {
  updateAvailability(): Promise<IBookDocument>;
}

export type IBookBase = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

export type IBookDocument = IBookBase & Document & IBookMethods;

export interface PaginatedBooks {
  data: IBookBase[]; // <- exactly what the UI wants
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
