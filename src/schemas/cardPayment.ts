import Joi from "joi";

const cardPayment = Joi.object({
  id: Joi.number().positive().integer().required(),
  amount: Joi.number().positive().integer().required(),
  businessId: Joi.number().positive().integer().required(),
  password: Joi.string().length(4).required(),
});

export default cardPayment;
