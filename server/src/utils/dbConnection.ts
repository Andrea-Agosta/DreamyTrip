import mongoose, { ConnectOptions } from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_LOCAL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    } as ConnectOptions);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export const close = () => mongoose.disconnect();