import request from "supertest";
import app from "../app";
import { users } from "./utils/test-user-data";

jest.mock('../jobs/placeList');
jest.mock('../utils/dbConnection.ts');

const updateUser = {
  name: 'John',
  surname: 'Doe',
  country: 'SE',
  email: 'johnUpdate@example.com',
  password: 'topsecret',
};

const addUserToDb = () =>
  request(app)
    .post('/api/auth/signup')
    .set("Accept", "application/json")
    .send(users[0])
    .expect("Content-Type", /json/);

const getUsers = (path: string) =>
  request(app)
    .get(path)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/);

const patchUser = (path: string) =>
  request(app)
    .patch(path)
    .set("Accept", "application/json")
    .send(updateUser)
    .expect("Content-Type", /json/);

const deleteUser = (path: string) =>
  request(app)
    .delete(path)
    .set("Accept", "application/json")

describe("Dreamy Flight User", () => {

  beforeEach(async () => {
    await addUserToDb();
  });

  describe("successufull request", () => {

    it("Get all users", async () => {
      return await getUsers('/api/user/')
        .expect(200)
        .then(response => {
          expect(response.body[0].name).toBe(users[0]?.name);
          expect(response.body.length).toBe(1);
        });
    });

    it("Get users by id", async () => {
      const user = await getUsers('/api/user/');
      return await getUsers(`/api/user/${user.body[0]._id}`)
        .expect(200)
        .then(response => {
          expect(response.body.name).toBe(users[0]?.name);
          expect(response.body.surname).toBe(users[0]?.surname);
          expect(response.body.country).toBe(users[0]?.country);
          expect(response.body.email).toBe(users[0]?.email);
        });
    });

    it("Update users by id", async () => {
      const user = await getUsers('/api/user/');
      return patchUser(`/api/user/${user.body[0]._id}`)
        .expect(200)
        .then(response => {
          expect(response.body.name).toBe(updateUser.name);
          expect(response.body.surname).toBe(updateUser.surname);
          expect(response.body.country).toBe(updateUser.country);
          expect(response.body.email).toBe(updateUser.email);
        });
    });

    it("Delete users by id", async () => {
      const user = await getUsers('/api/user/');
      return await deleteUser(`/api/user/${user.body[0]._id}`)
        .expect(204)
        .then(async () => {
          const users = await getUsers('/api/user/');
          return expect(users.body.length).toBe(0);
        });
    });
  });

  describe("Fail request", () => {

    it("GET error with a wrong id", async () => {
      return await getUsers(`/api/user/wrongId`)
        .expect(400)
        .then(response => {
          expect(response.body).toStrictEqual({ "message": "Bad request" });
        });
    });

    it("PATCH error with a wrong id", async () => {
      return await patchUser(`/api/user/wrongId`)
        .expect(400)
        .then(response => {
          expect(response.body).toStrictEqual({ "message": "Bad request" });
        });
    });

    it("DELETE error with a wrong id", async () => {
      return await deleteUser(`/api/user/wrongId`)
        .expect(400)
        .then(response => {
          expect(response.body).toStrictEqual({ "message": "Bad request" });
        });
    });
  });
});