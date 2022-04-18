import Joi from "joi";

const cardRecharge = Joi.object({
  id: Joi.number().positive().integer().required(),
  amount: Joi.number().positive().integer().required(),
});

export default cardRecharge;
