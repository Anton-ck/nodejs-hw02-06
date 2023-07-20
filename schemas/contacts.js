const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(/^\([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2}/)
    .messages({ "string.pattern.base": `Phone number must have only 10 digits.` })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateFavSchema,
};
