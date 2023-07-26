const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const User = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const tempDirResize = path.join(__dirname, "../", "tmp", "resize");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  const payload = {
    id: user._id,
  };

  if (!passwordCompare) {
    throw HttpError(401, "Password is wrong");
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,

    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ subscription: result.subscription });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(404, "File not found for upload");
  }
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const sizeImg = "250x250_";
  const fileName = `${_id}_${originalname}`;
  const resizeFileName = `${sizeImg}${fileName}`;
  const resultUpload = path.join(avatarsDir, resizeFileName);
  const resizeResultUpload = path.join(tempDirResize, resizeFileName);

  (await Jimp.read(tempDir)).resize(250, 250).writeAsync(`${tempDirResize}/${resizeFileName}`);

  await fs.unlink(tempDir);
  await fs.rename(resizeResultUpload, resultUpload);

  const avatarURL = path.join("avatars", resizeFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
