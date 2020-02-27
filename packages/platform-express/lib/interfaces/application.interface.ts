import { ApplicationAdapterRouteOptions } from '@novajs/core';
import { NextFunction, Request, Response } from 'express';

export type ExpressRouteOptions = {
  handler: (req: Request, res: Response, next: NextFunction) => void;
} & ApplicationAdapterRouteOptions;

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
