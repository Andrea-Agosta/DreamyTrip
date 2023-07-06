// import { createUser } from '../../repositories/user.repository';
// import { GenericContainer, StartedTestContainer, Network } from 'testcontainers';
// import dotenv from "dotenv";

// dotenv.config();

// let mongoContainer: StartedTestContainer | undefined;
// let network: any;

// beforeAll(async () => {
//   jest.setTimeout(60000); // Increase timeout for container startup

//   try {
//     // Create a custom network for the containers to communicate
//     network = await new Network().start();

//     // Start the dbTest container and connect it to the network
//     mongoContainer = await new GenericContainer('mongo')
//       .withExposedPorts(8081)
//       .withNetwork(network)
//       .start();

//     // Get the MongoDB connection URL
//     const mongoHost = mongoContainer.getHost();
//     const mongoPort = mongoContainer.getMappedPort(8081);
//     const mongoURL = `mongodb://root:example@${mongoHost}:${mongoPort}/test`;

//     // Set the MongoDB connection URL as an environment variable
//     process.env.MONGO_URL_TEST = mongoURL;

//     await new Promise((resolve) => setTimeout(resolve, 5000));
//   } catch (error) {
//     console.error('Error during container startup:', error);
//     // Handle the error appropriately, e.g., fail the tests or perform cleanup
//   }
// }, 1200000);

// afterAll(async () => {
//   // Stop and remove the containers
//   if (mongoContainer) {
//     await mongoContainer.stop();
//     // Commented out: await mongoContainer.remove();
//   }

//   // Stop and remove the network
//   if (network) {
//     await network.stop();
//   }
// });

// const user = {
//   name: 'John',
//   surname: 'Doe',
//   country: 'SE',
//   email: 'john@example.com',
//   password: 'topsecret',
// };

// it('should save user in the DB', async () => {
//   process.env.MONGO_URL_TEST = 'mongodb://root:example@mongo:27018/test';
//   const response = await createUser(user.name, user.surname, user.country, user.email, user.password);
//   expect(response.name).toBe(user.name);
// });

import mongoose from 'mongoose';
import { createUser } from '../../repositories/user.repository';
import { dbClose, dbConnect } from '../../utils/dbConnection';
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  dbConnect('mongodb://test:test@localhost:27018');
});

afterEach(async () => {
  await mongoose.connect('mongodb://test:test@localhost:27018');
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  dbClose();
});

const user = {
  name: 'John',
  surname: 'Doe',
  country: 'SE',
  email: 'john@example.com',
  password: 'topsecret',
};

it('should save user in the DB', async () => {
  const response = await createUser(user.name, user.surname, user.country, user.email, user.password);
  expect(response.name).toBe(user.name);
});