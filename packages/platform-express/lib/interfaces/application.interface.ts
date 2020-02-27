import { ApplicationAdapterRouteOptions } from '@fastify-plus/core';
import { NextFunction, Request, Response } from 'express';

export type ExpressRouteOptions = {
  handler: (req: Request, res: Response, next: NextFunction) => void;
} & ApplicationAdapterRouteOptions;

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
