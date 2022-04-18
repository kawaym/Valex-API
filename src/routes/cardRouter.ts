import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";

import { createCard, activateCard } from "../controllers/cardController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import * as schemas from "../schemas/schemas.js";

const cardRouter = Router();

cardRouter.post(
  "/companyAdmin/create-card",
  validateSchema(schemas.cardCreation),
  validateToken,
  createCard
);
cardRouter.put(
  "/employee/activate-card",
  validateSchema(schemas.cardActivation),
  activateCard
);

export default cardRouter;
