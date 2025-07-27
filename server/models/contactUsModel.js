const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  queryReply: {
    type: mongoose.Schema.Types.Mixed, // for any type
    default: {},
  },
  userId: { type: String },
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
