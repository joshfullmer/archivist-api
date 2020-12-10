import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { ValidationErrorItem } from 'sequelize/types';
import { User, UserInstance, UserRole } from './models/User';
import { HttpStatus } from './types/http';
import { AuthenticationError, ForbiddenError } from 'apollo-server';

const accessTokenSecret = 'correct horse battery staple';

export type UserContext = {
  username: string;
  email: string;
  role: UserRole;
  iat: number;
}

const createJwt = (user: UserInstance): string => {
  const { username, email, role } = user;

  return jwt.sign({ username, email, role }, accessTokenSecret);
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hashSync(password, 10);

  if(!username || !email || !password) {
    res.status(HttpStatus.BAD_REQUEST).send();

    return;
  }

  try {
    const user = await User.create({ username, email, password: hash, role: UserRole.MEMBER });

    const userJwt = createJwt(user);

    res.status(HttpStatus.CREATED).json({ jwt: userJwt });
  } catch ({ errors }) {
    const errorList = errors.map((error: ValidationErrorItem) => {
      return `${error.path} already exists.`;
    });

    res.status(HttpStatus.CONFLICT).json({ errors: errorList });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username = '', email = '', password } = req.body;

  if(!password || !(username || email)) {
    res.status(HttpStatus.UNAUTHORIZED).send();

    return;
  }
  const user = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });

  if(!user?.password) {
    res.status(HttpStatus.UNAUTHORIZED).send();

    return;
  }

  if(bcrypt.compareSync(password, user.password)) {
    const userJwt = createJwt(user);

    res.status(HttpStatus.OK).json({ jwt: userJwt });
  } else {
    res.status(HttpStatus.UNAUTHORIZED).send();
  }
};

export const createUserContext = async ({ req }: { req: Request }): Promise<{ user: UserContext }> => {
  const authHeader = req.headers.authorization || '';

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    let user;

    try {
      user = jwt.verify(token, accessTokenSecret) as UserContext;
    } catch (error) {
      throw new ForbiddenError('Access denied');
    }

    const { email, username } = user;

    const authedUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    if (!authedUser) {
      throw new AuthenticationError('You must be logged in');
    }

    return { user };

  } else {
    throw new AuthenticationError('You must be logged in');
  }
};