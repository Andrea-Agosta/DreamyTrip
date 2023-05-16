import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../dbRepository/userRepository';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const saltRounds: number = process.env.SALT ? parseInt(process.env.SALT, 10) : 10;
const secretKey: string = process.env.TOP_SECRET || '';

passport.use(
  'signup',
  new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      if (!emailRegex.test(email) || !password || !req.body.name || !req.body.surname || !req.body.country) {
        throw new Error('BadRequestError');
      }

      const checkIfEmailAlreadyExists = await getUserByEmail(email);
      if (checkIfEmailAlreadyExists) {
        throw new Error('An unknown error occurred');
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = await createUser(req.body.name, req.body.surname, req.body.country, email, hashPassword);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'NotFoundError' });
      }
      const validate: boolean = user && bcrypt.compareSync(password, user.password);
      if (!validate) {
        return done(null, false, { message: 'BadRequestError' });
      }
      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JWTstrategy({ secretOrKey: secretKey, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);

export default passport;
