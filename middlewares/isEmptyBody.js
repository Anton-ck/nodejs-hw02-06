const { HttpError } = require("../helpers");


const isEmptyBody = (req, res, next) => {
    const emptyBody = !Object.keys(req.body).length;
  if (emptyBody) {
    next(HttpError(400, "Missing fields"));
  }
  next();
};

module.exports = isEmptyBody;