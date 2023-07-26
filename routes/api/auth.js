const express = require("express");

const schemas = require("../../schemas/user");

const { validateBody, isEmptyBody, authenticate, upload } = require("../../middlewares");

const controllers = require("../../controllers/auth");

const router = express.Router();

router.post("/register", isEmptyBody, validateBody(schemas.authSchema), controllers.registerUser);

router.post("/login", isEmptyBody, validateBody(schemas.authSchema), controllers.loginUser);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  controllers.updateSubscriptionUser
);

router.patch("/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar);

module.exports = router;
