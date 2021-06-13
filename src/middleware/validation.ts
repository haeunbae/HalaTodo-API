import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const isContentValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('title')
    .optional()
    .isLength({ max: 60 })
    .isString()
    .notEmpty()
    .run(req);

  await check('contents').isLength({ max: 400 }).isString().notEmpty().run(req);

  await check('startedAt')
    .isISO8601()
    .isBefore(req.body.endedAt)
    .withMessage('Start date have invalid format or cannot be before end date')
    .run(req);

  await check('endedAt')
    .isISO8601()
    .isAfter(req.body.startedAt)
    .withMessage('End date have invalid format or cannot be after start date')
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'Invalid parameter',
      errors: errors.array(),
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'Id Error',
      errors: errors.array(),
    });

    return;
  }

  next();
};

export const isUpdateParamValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const titleChk = check('title')
    .optional()
    .isLength({ max: 60 })
    .isString()
    .notEmpty()
    .run(req);

  const contentsChk = check('contents')
    .optional()
    .isLength({ max: 400 })
    .isString()
    .notEmpty()
    .run(req);

  const startedAtChk = check('startedAt')
    .optional()
    .isISO8601()
    .isBefore(req.body.endedAt)
    .withMessage('Start date have invalid format or cannot be before end date')
    .run(req);

  const endedAtChk = check('endedAt')
    .optional()
    .isISO8601()
    .isAfter(req.body.startedAt)
    .withMessage('End date have invalid format or cannot be after start date')
    .run(req);

  await Promise.all([titleChk, contentsChk, startedAtChk, endedAtChk]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'Update parameter Error',
      errors: errors.array(),
    });

    return;
  }

  next();
};

export const isCompleteParamValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('complete')
    .isIn([0, 1])
    .withMessage('invalid parameter')
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'Complete parameter Error',
      errors: errors.array(),
    });

    return;
  }

  next();
};
