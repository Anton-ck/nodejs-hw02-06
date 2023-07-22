const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValid = (req, res, next) => {
  const { contactId, userId } = req.params;
  if (!isValidObjectId(contactId || userId)) {
    next(HttpError(400, `${contactId || userId} is not valid ID`));
  }
  next();
};

module.exports = isValid;
