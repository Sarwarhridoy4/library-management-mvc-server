import dotenv from "dotenv";
dotenv.config(); 
import app from "./app";
import connectDB from "./config/db"; // must come *after* dotenv.config()

const port = process.env.PORT || 5000;

(async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
})();
