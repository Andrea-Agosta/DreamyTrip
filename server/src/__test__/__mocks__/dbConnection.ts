import mongoose, { ConnectOptions } from 'mongoose';

export const dbConnect = async () => {
  try {
    if (process.env.MONGO_URL_TEST) {
      await mongoose.connect(process.env.MONGO_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    } else {
      console.error('Failed to connect to MongoDB:');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};

export const dbClose = () => mongoose.disconnect();