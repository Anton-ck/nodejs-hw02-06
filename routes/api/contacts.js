const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, isValid, isEmptyBody, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", authenticate, controllers.getAll);

router.get("/:contactId", authenticate, isValid, controllers.getContactById);

router.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(schemas.addSchema),
  controllers.addContact
);

router.delete("/:contactId", authenticate, isValid, controllers.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValid,
  isEmptyBody,
  validateBody(schemas.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValid,
  validateBody(schemas.updateFavSchema),
  controllers.updateStatusContact
);

module.exports = router;
