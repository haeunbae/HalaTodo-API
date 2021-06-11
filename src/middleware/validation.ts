import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const isContentValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('title')
    .isLength({ min: 1, max: 60 })
    .isString()
    .notEmpty()
    .run(req);

  await check('contents')
    .isLength({ min: 1, max: 400 })
    .isString()
    .notEmpty()
    .run(req);

  await check('startedAt').isISO8601().run(req);

  await check('endedAt').isISO8601().run(req);

  if (!validationResult(req).isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'content Error',
    });
    return;
  }

  next();
};

export const isIdValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('id').isNumeric().notEmpty().run(req);

  if (!validationResult(req).isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'Id Error',
    });
    return;
  }

  next();
};
