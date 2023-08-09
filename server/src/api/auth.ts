import passport from 'passport';
import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import { IUser } from '../types/userTypes';
import { tryCatch } from '../utils/tryCatch';
import '../controllers/auth.controller';


const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session: false }), async (req: Request<{}, {}, IUser>, res: Response) => {
  const secret = process.env.TOP_SECRET || 'defaultSecretKey';
  const body = {
    name: req.body.name,
    surname: req.body.surname,
    country: req.body.country,
    email: req.body.email,
  };
  const token = jwt.sign({ user: body }, secret, { expiresIn: '1h' });
  res.status(201).cookie('auth', token).json({
    message: 'Signup successful',
    user: req.user,
  });
});

router.post('/login', tryCatch(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err: Error | null, user: IUser) => {
    if (err || !user) {
      return next(err);
    }
    req.login(user, { session: false }, async (error) => {
      if (error) {
        return next(error);
      }
      const secret = process.env.TOP_SECRET || 'defaultSecretKey';
      const body = { name: req.body.name, surname: req.body.surname, country: req.body.country, email: req.body.email };
      const token = jwt.sign({ user: body }, secret, { expiresIn: '1h' });
      return res.cookie('auth', token, { maxAge: 60 * 60 * 1000 }).send('Login successful');
    });
  })(req, res, next);
}));

export default router;