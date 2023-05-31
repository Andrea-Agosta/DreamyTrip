import mongoose, { ConnectOptions } from "mongoose";

export const dbConnect = async () => {
  const dbUrl = process.env.MONGO_URL_TEST || process.env.MONGO_URL_LOCAL;
  try {
    await mongoose.connect(dbUrl!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export const dbClose = () => mongoose.disconnect();