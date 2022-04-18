import { Request, Response } from "express";

import * as employeeService from "../services/employeeService.js";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  try {
    const employee = await employeeService.findById(req.body.id);
    const cardType = req.body.type;

    await cardService.checkTypeAndEmployeeId(cardType, req.body.id);

    await cardService.createCard(req.body.id, employee.fullName, cardType);
  } catch (e) {
    if (e === "error_not_found") {
      return res.sendStatus(404);
    } else if (e === "error_conflict") {
      return res.sendStatus(409);
    } else {
      return res.sendStatus(500);
    }
  }
}
