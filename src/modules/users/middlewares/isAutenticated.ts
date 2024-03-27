import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

const isAutenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token not found', 401);
  }

  const accessToken = authHeader.replace('Bearer ', '');
  if (!accessToken) {
    throw new AppError('Token invalid', 401);
  }

  try {
    const decodedToken = verify(accessToken, authConfig.jwt.secret as Secret);

    const { sub } = decodedToken as JwtPayload;

    if (sub) request.user = { id: sub };

    return next();
  } catch (error) {
    throw new AppError('Token invalid', 401);
  }
};

export default isAutenticated;
