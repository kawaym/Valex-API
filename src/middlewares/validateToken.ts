import { NextFunction, Request, Response } from "express";

import * as companyService from "../services/companyService.js";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = <string>req.headers["x-api-key"];
  try {
    const company = await companyService.findByApiKey(apiKey);
    res.locals.company = company;
  } catch (e) {
    if ((e = "error_not_found")) return res.sendStatus(401);
  }

  next();
}
