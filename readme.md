---
# 📚 Library Management System API

A robust, scalable, and type-safe REST API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. Designed for managing library resources efficiently, this backend service provides full CRUD functionality for books, borrowing workflows, and insightful borrowing summaries.

[![Library Management API](https://img.shields.io/badge/API-Live%20Demo-blue?style=for-the-badge\&logo=vercel)](https://library-management-server-redux.vercel.app)

[![Video ReadMe](https://img.shields.io/badge/📽️%20Video%20Walkthrough-blue?style=for-the-badge)](https://drive.google.com/drive/folders/1weiJuFP9FC-QJP01EEKtV6S7NlzIrCSY?usp=sharing)
---

## 🚀 Features

- 🔧 Full CRUD support for managing books
- 🔄 Borrowing system with dynamic availability tracking
- 📊 Aggregated reports on borrowing history
- ✅ Input validation using **Zod**
- 🧠 Business logic via **Mongoose** static & instance methods
- 🔥 Centralized and consistent error handling
- 📁 Modular, maintainable code structure using a layered architecture

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── config/                # MongoDB connection
│   ├── middlewares/          # Global error handler
│   ├── modules/
│   │   ├── book/             # Book module: model, controller, route, etc.
│   │   └── borrow/           # Borrow module: logic and aggregation
│   ├── routes/               # Root/home routes
│   └── utils/                # Utility functions (e.g., standardized responses)
├── app.ts                    # Express app setup
├── server.ts                 # Entry point
├── .env                      # Environment variables
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint configuration
└── package.json
```

---

## ⚙️ Tech Stack

- **Node.js** + **Express** – RESTful server
- **TypeScript** – Static typing and robust structure
- **MongoDB + Mongoose** – Data modeling and querying
- **Zod** – Schema validation
- **ESLint & Prettier** – Code linting and formatting

---

## 🔌 API Overview

### 🔰 Base URL

```
http://localhost:5000/api
```

---

### 🏠 Root Endpoint

```http
GET /
```

Returns a welcome message and links to all available routes.

---

### 📚 Book Endpoints

#### ➕ Create a Book

```http
POST /api/books
```

**Request Body:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

#### 📖 Get All Books

```http
GET /api/books
```

**Query Parameters (optional):**

- `genre` — Filter by genre
- `sortBy` — Sort field (e.g., `createdAt`)
- `sort` — `asc` or `desc`
- `limit` — Number of results

---

#### 🔍 Get Single Book

```http
GET /api/books/:bookId
```

---

#### ✏️ Update Book (Partial Allowed)

```http
PUT /api/books/:bookId
```

```json
{
  "copies": 10
}
```

---

#### 🗑️ Delete Book

```http
DELETE /api/books/:bookId
```

---

### 🔄 Borrow Endpoints

#### 📥 Borrow a Book

```http
POST /api/borrow
```

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

> ✅ Automatically updates availability based on remaining copies. If `copies === 0`, `available = false` (via instance method).

---

#### 📊 Borrow Summary Report

```http
GET /api/borrow
```

**Example Response:**

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## ✅ Validation Rules (Zod)

### 📘 Book Schema

- `title`, `author`, `isbn`, `genre`, and `copies` — required
- `genre` must be one of: `FICTION`, `SCIENCE`, `BIOGRAPHY`, etc.

### 🔁 Borrow Schema

- `book`, `quantity`, and `dueDate` — required
- `quantity` must be a positive integer

---

## 🧠 Architectural Highlights

- **Zod Validation** – Centralized validation layer for clean and safe inputs
- **Service Layer Pattern** – Separates business logic from controllers
- **Mongoose Instance Methods** – Book model manages its own availability status
- **Aggregation Pipelines** – Efficiently compute borrow summaries
- **Global Error Handling** – Middleware-based error formatting and logging

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourname/library-management-api.git
cd library-management-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the root:

```bash
MONGODB_URI=mongodb://localhost:27017/library
PORT=5000
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

> Server should now be running at: [http://localhost:5000](http://localhost:5000)

---

## 📎 Useful Links

- 🔗 **Live API:** [https://library-management-server-swart-seven.vercel.app](https://library-management-server-swart-seven.vercel.app)
- 📽️ **Video Demo:** [Watch here](https://drive.google.com/drive/folders/1weiJuFP9FC-QJP01EEKtV6S7NlzIrCSY?usp=sharing)

---

## 🧑‍💻 Author

**Sarwar Hossain**
[GitHub Profile](https://github.com/Sarwarhridoy4)

---
