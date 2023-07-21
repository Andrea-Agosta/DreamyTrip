import { createUser } from '../../repositories/user.repository';

export const users = [
  {
    name: 'John',
    surname: 'Doe',
    country: 'SE',
    email: 'john@example.com',
    password: 'topsecret',
  },
  {
    name: 'Smith',
    surname: 'Hopster',
    country: 'SE',
    email: 'Smit@example.com',
    password: 'topsecret',
  },
  {
    name: 'Mary',
    surname: 'Calipso',
    country: 'SE',
    email: 'mary@example.com',
    password: 'topsecret',
  }
];

export const populateDb = async () => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user) {
      await createUser(user.name, user.surname, user.country, user.email, user.password);
    } else {
      throw new Error("Impossible to popultae DB");
    }
  }
}