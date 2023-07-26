const Joi = require("joi");

const { emailRegexp } = require("../helpers/regExp");

const authSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = {
  authSchema,
  updateSubscriptionSchema,
};
