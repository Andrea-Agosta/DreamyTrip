import { BadRequestError } from '@src/utils/customErrors';
import { createUser, getUserByEmail, getUserById, getUsers, updateUser, deleteUser } from '../../repositories/user.repository';
import { populateDb, users } from '../utils/test-user-data';

jest.mock('../../utils/dbConnection.ts');

describe('User Repository', () => {

  it('Get all users', async () => {
    await populateDb();
    const response = await getUsers();
    expect(response.length).toBe(3);
  });

  it('Get user by ID', async () => {
    await populateDb();
    const response = await getUsers();
    if (response[1]?.id) {
      const user = await getUserById(response[1].id);
      expect(user?.name).toBe(users[1]?.name);
      expect(user?.surname).toBe(users[1]?.surname);
      expect(user?.country).toBe(users[1]?.country);
      expect(user?.email).toBe(users[1]?.email);
      expect(user?.password).toBe(users[1]?.password);
    } else {
      throw new Error("get user by ID failed");
    }
  });

  it('Get user by mail', async () => {
    await populateDb();
    const user = await getUserByEmail('mary@example.com');
    expect(user?.name).toBe(users[2]?.name);
    expect(user?.surname).toBe(users[2]?.surname);
    expect(user?.country).toBe(users[2]?.country);
    expect(user?.email).toBe(users[2]?.email);
    expect(user?.password).toBe(users[2]?.password);
  });

  it('Create new User', async () => {
    const user = users[0];
    if (user) {
      const response: any = await createUser(user.name, user.surname, user.country, user.email, user.password);
      expect(response.name).toBe(user.name);
      expect(response.surname).toBe(user.surname);
      expect(response.country).toBe(user.country);
      expect(response.email).toBe(user.email);
      expect(response.password).toBe(user.password);
    } else {
      throw new Error("create user failed");
    }
  });

  describe('Update user', () => {
    it('Update User successfully', async () => {
      const data = {
        name: 'Smith John',
        surname: 'Hopster',
        country: 'SE',
        email: 'SmitJoHop@example.com',
        password: 'updatepassword',
      };
      await populateDb();
      const users = await getUsers();
      if (users[1]?.id) {
        const updateUserResp = await updateUser(users[1].id, data);
        expect(updateUserResp.name).toBe(data.name);
        expect(updateUserResp.surname).toBe(data.surname);
        expect(updateUserResp.country).toBe(data.country);
        expect(updateUserResp.email).toBe(data.email);
        expect(updateUserResp.password).toBe(data.password);
      } else {
        throw new Error("User update failed");
      }
    });

    it('Update User return error with wrong id', async () => {
      const data = {
        name: 'Smith John',
        surname: 'Hopster',
        country: 'SE',
        email: 'SmitJoHop@example.com',
        password: 'updatepassword',
      };
      await populateDb();
      expect(updateUser('aaaa', data)).rejects.toThrow(new BadRequestError());
    });
  });

  it('Delete user', async () => {
    await populateDb();
    const users = await getUsers();
    if (users[1]?.id) {
      await deleteUser(users[1].id);
      const getResp = await getUsers();
      expect(getResp.length).toBe(2);
    }
  });
});