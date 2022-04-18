import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";

import { createCard } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.get("/", validateToken, createCard);

export default cardRouter;
