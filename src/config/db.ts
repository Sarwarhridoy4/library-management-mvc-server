import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const uri =
      process.env.MONGODB_URI ||
      "mongodb+srv://sarwar4:0czcswD0N6JFcJZq@cluster0.9rpk71q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // console.log(uri);
    await mongoose.connect(uri as string);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
