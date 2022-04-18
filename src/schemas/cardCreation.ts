import Joi from "joi";

const cardCreation = Joi.object({
  id: Joi.number().positive().required(),
  type: Joi.valid(
    "groceries",
    "restaurant",
    "transport",
    "education",
    "health"
  ).required(),
});

export default cardCreation;
