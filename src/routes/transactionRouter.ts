import { Router } from "express";

import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import * as schemas from "../schemas/schemas.js";
import {
  createPayment,
  createRecharge,
  readBalance,
} from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.post(
  "/companyAdmin/recharge-card",
  validateToken,
  validateSchema(schemas.cardRecharge),
  createRecharge
);
transactionRouter.get("/employee/get-balance", readBalance);
transactionRouter.post(
  "/business/create-payment",
  validateSchema(schemas.cardPayment),
  createPayment
);

export default transactionRouter;
