import passport from 'passport';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import '../controller/auth.controller';
import { IUser } from '../config/type/userTypes';


router.post('/signup', passport.authenticate('signup', { session: false }), async (req: Request<{}, {}, IUser>, res: Response) => {
  if (!process.env.TOP_SECRET) {
    throw new Error('Missing TOP_SECRET environment variable');
  }
  const body = { name: req.body.name, surname: req.body.surname, country: req.body.country, email: req.body.email };
  const token = jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: '1h' });
  res.status(201).cookie('auth', token).json({
    message: 'Signup successful',
    user: req.user
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err: Error | null, user: IUser) => {
    try {
      if (err || !user) {
        throw new Error('BadRequestError');
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }
        if (!process.env.TOP_SECRET) {
          throw new Error('Missing TOP_SECRET environment variable');
        }
        const body = { name: req.body.name, surname: req.body.surname, country: req.body.country, email: req.body.email };
        const token = jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: '1h' });
        return res.cookie('auth', token, { maxAge: 60 * 60 * 1000 }).send('Login successful');
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;