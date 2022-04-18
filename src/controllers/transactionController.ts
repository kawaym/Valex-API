import { Request, Response } from "express";

import * as employeeService from "../services/employeeService.js";
import * as cardService from "../services/cardService.js";

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

export async function createRecharge(req: Request, res: Response) {
  try {
    const { id, amount } = req.body;
    if (!id || !amount) return res.sendStatus(422);

    await cardService.createRecharge(id, amount);
    return res.sendStatus(201);
  } catch (e) {
    if (e === "error_not_found") {
      return res.sendStatus(404);
    } else if (e === "card_expired") {
      return res.sendStatus(401);
    }
  }
}

export async function createPayment(req: Request, res: Response) {
  try {
    const { id, businessId, amount, password } = req.body;
    if (!id || !amount || !businessId || !password) return res.sendStatus(422);

    await cardService.createPayment(id, amount, businessId, password);
    return res.sendStatus(201);
  } catch (e) {
    if (e === "error_not_found") {
      return res.sendStatus(404);
    } else if (e === "card_expired") {
      return res.sendStatus(401);
    } else if (e === "error_wrong_password") {
      return res.sendStatus(401);
    } else if (e === "card_not_activated") {
      return res.sendStatus(401);
    } else if (e === "not_enough_balance") {
      return res.sendStatus(402);
    } else {
      return res.sendStatus(500);
    }
  }
}
