import { Request, Response } from "express";

import * as employeeService from "../services/employeeService.js";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  try {
    const employee = await employeeService.findById(req.body.id);
    const cardType = req.body.type;

    await cardService.checkTypeAndEmployeeId(cardType, req.body.id);

    await cardService.createCard(req.body.id, employee.fullName, cardType);
    return res.sendStatus(201);
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
export async function activateCard(req: Request, res: Response) {
  try {
    const { id, securityCode, password } = req.body;

    await cardService.activateCard(id, securityCode, password);
    return res.sendStatus(200);
  } catch (e) {
    if (e === "error_not_found") {
      return res.sendStatus(404);
    } else if (e === "card_expired") {
      return res.sendStatus(401);
    } else if (e === "card_already_activated") {
      return res.sendStatus(409);
    } else if (e === "invalid_CVC") {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(500);
    }
  }
}

export async function readBalance(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) return res.sendStatus(422);

    const balance = await cardService.getBalance(id);
    res.status(200).send(balance);
  } catch (e) {
    return res.sendStatus(500);
  }
}
