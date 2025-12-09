import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log(error);
  }
};

export { connectToDB };
