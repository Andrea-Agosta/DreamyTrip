import request from "supertest";
import app from "../app";
import { users } from "./utils/test-user-data";

jest.mock('../utils/dbConnection.ts');

const requestSignupUser = () =>
  request(app)
    .post('/api/auth/signup')
    .set("Accept", "application/json")
    .send(users[0])
    .expect("Content-Type", /json/);

const requestLoginUsers = () =>
  request(app)
    .post('/api/auth/login')
    .set("Accept", "application/json")
    .send({ email: users[0]?.email, password: users[0]?.password })

describe("Dreamy Flight app", () => {

  describe("successufull request", () => {

    it("Signup request", async () => {
      return await requestSignupUser()
        .expect(201)
        .then(response => {
          expect(response.body.user.name).toBe(users[0]?.name);
          expect(response.body.user.surname).toBe(users[0]?.surname);
          expect(response.body.user.country).toBe(users[0]?.country);
          expect(response.body.user.email).toBe(users[0]?.email);
          expect(response.headers['set-cookie']).toBeDefined();
        });
    });

    it('Login request', async () => {
      await requestSignupUser();
      return await requestLoginUsers()
        .expect(200)
        .then((response) => {
          expect(response.text).toBe('Login successful');
          expect(response.headers['set-cookie']).toBeDefined();
        });
    });
  });
});
