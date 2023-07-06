import mongoose, { ConnectOptions } from "mongoose";

export const dbConnect = async (dbUri = process.env.MONGO_URL_LOCAL) => {
  try {
    console.log(dbUri, 'dbURL');
    if (dbUri) {
      await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export const dbClose = () => mongoose.disconnect();