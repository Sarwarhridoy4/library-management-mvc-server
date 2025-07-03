import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import BookRoutes from "./app/modules/book/book.route";
import { globalErrorHandler } from "./app/middleware/errorHandler";
import BorrowRoutes from "./app/modules/borrow/borrow.route";

const app: Application = express();

const whitelist = [
  "http://localhost:5173",
  "https://shelf-wise-two.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // ➜ Same‑origin or non‑browser request (no Origin header) – allow it
        return callback(null, true);
      }

      if (whitelist.includes(origin)) {
        // ➜ Allowed cross‑origin request
        return callback(null, true);
      }

      // ➜ Reject everything else
      return callback(new Error(`CORS: ${origin} is not allowed`), false);
    },
    credentials: true, // keep if you need cookies / auth headers
    optionsSuccessStatus: 200, // fixes legacy browser quirks
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Library Management API...",
  });
});

app.use("/api/books", BookRoutes);
app.use("/api/borrow", BorrowRoutes);

// Handle 404 errors for undefined routes

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
  next();
});
// Global error handler

app.use(globalErrorHandler);

export default app;
