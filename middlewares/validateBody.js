const { HttpError } = require("../helpers/");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, `Missing required field! ${error.message}`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
