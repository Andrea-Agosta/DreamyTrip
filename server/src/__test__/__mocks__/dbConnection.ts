import mongoose, { ConnectOptions } from "mongoose";

export const dbConnect = async () => {
  try {
    if (process.env.MONGO_URL_TEST) {
      await mongoose.connect(process.env.MONGO_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    } else {
      console.error('Failed to connect to MongoDB:');
      process.exit(1);
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export const dbClose = () => mongoose.disconnect();