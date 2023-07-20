const express = require("express");

const schemas = require("../../schemas/user");

const { validateBody, isEmptyBody, authenticate, isValid } = require("../../middlewares");

const controllers = require("../../controllers/auth");

const router = express.Router();

router.post("/register", isEmptyBody, validateBody(schemas.authSchema), controllers.registerUser);

router.post("/login", isEmptyBody, validateBody(schemas.authSchema), controllers.loginUser);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

router.patch(
  "/:userId/subscription",
  authenticate,
  isValid,
  validateBody(schemas.updateSubscriptionSchema),
  controllers.updateSubscriptionUser
);

module.exports = router;
