import mongoose, { ConnectOptions } from 'mongoose';

export const dbConnect = async () => {
  try {
    if (process.env.MONGO_URL_LOCAL) {
      await mongoose.connect(process.env.MONGO_URL_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const dbClose = () => mongoose.disconnect();