const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, isValid, isEmptyBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", isValid, controllers.getContactById);

router.post("/", isEmptyBody, validateBody(schemas.addSchema), controllers.addContact);

router.delete("/:contactId", isValid, controllers.deleteContact);

router.put(
  "/:contactId",
  isValid,
  isEmptyBody,
  validateBody(schemas.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValid,
  validateBody(schemas.updateFavSchema),
  controllers.updateStatusContact
);

module.exports = router;
