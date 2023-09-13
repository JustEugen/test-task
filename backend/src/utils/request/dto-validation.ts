import { NextFunction, Request, Response } from 'express';

export const dtoValidation = (dtoSchema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await dtoSchema.validate(req.body);
      next();
    } catch (err) {
      return res.status(400).send(err);
    }
  };
};
