const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^\([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2}/, // (000) 000 00 00
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
