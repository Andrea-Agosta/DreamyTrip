import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { login, signup } from '../service/auth.service';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const secretKey: string = process.env.TOP_SECRET || '';

passport.use(
  'signup',
  new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      console.log('inside singup controller', req.body)
      if (!emailRegex.test(email) || !password || !req.body.name || !req.body.surname || !req.body.country) {
        throw new Error('BadRequestError');
      }
      return await signup(req, email, password, done);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      return await login(email, password, done);
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
