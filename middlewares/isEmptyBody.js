const { HttpError } = require("../helpers");

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(HttpError(400, "Missing fields"));
  }
  next();
};

module.exports = isEmptyBody;
