import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationErrorItem } from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail: ValidationErrorItem) => detail.message);
      res.status(400).json({ message: 'Validation error', errors });
      return;
    }

    next();
  };
};
