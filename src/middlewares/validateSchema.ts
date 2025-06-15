import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateSchema = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return void next();
  } catch (err: any) {
    return void res.status(400).json({
      message: err.errors,
    });
  }
};

export default validateSchema;
