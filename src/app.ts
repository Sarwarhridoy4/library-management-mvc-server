import express from "express";
import cors from "cors";
import BookRoutes from "./modules/book/book.route";
import { globalErrorHandler } from "./middleware/errorHandler";
import BorrowRoutes from "./modules/borrow/borrow.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", BookRoutes);
app.use("/api/borrow", BorrowRoutes);

app.use(globalErrorHandler);

export default app;
