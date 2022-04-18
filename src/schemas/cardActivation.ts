import Joi from "joi";

const cardActivation = Joi.object({
  id: Joi.number().positive().required(),
  securityCode: Joi.number()
    .max(999)
    .min(1)
    .positive()
    .cast("string")
    .required(),
  password: Joi.string().length(4).required(),
});

export default cardActivation;
