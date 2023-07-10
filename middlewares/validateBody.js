const { HttpError } = require("../helpers/");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const requireField = schema.validate(req.body);
    const emptyBody = !Object.keys(req.body).length;

    if (emptyBody) {
      throw HttpError(400, "Missing fields");
    }

    if (error) {
      const requireFieldError = requireField.error.details[0].path[0];

      throw (HttpError(400, `Missing required ${requireFieldError} field!`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
