import { NextFunction, Request, Response } from "express";

export function validateSchema(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const validation = schema.validate(payload);

    if (validation.error) {
      return res.sendStatus(422);
    }

    res.locals.payload = validation.value;
    next();
  };
}
