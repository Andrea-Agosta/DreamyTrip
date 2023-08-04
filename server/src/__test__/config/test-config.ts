import mongoose from 'mongoose';

beforeEach(async () => {
  if (process.env.MONGO_URL_TEST) {
    await mongoose.connect(process.env.MONGO_URL_TEST);
    await mongoose.connection.dropDatabase();
  } else {
    throw new Error('MONGO_URL_TEST is not set');
  }
});

afterEach(async () => {
  await mongoose.connection.close();
});