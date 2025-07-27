const Joi = require("joi");

const minAge = 6;
const maxAge = 60;

const today = new Date();
const minDate = new Date(
  today.getFullYear() - maxAge,
  today.getMonth(),
  today.getDate()
).toISOString();

const maxDate = new Date(
  today.getFullYear() - minAge,
  today.getMonth(),
  today.getDate()
).toISOString();

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&]).{8,}$"))
      .required(),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    dateOfBirth: Joi.date()
      .iso()
      .min(minDate)
      .max(maxDate)
      .required()
      .messages({
        "date.min": `You must be younger than ${maxAge} years old.`,
        "date.max": `You must be at least ${minAge} years old.`,
      }),
    permanentAddress: Joi.string().trim().required(),
    school_CollegeName: Joi.string().trim().required(),
    board_UniversityName: Joi.string().trim().required(),
    class_DegreeName: Joi.string().trim().required(),
    yearOfStudy: Joi.string().trim().required(),
    gender: Joi.string().trim().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Bad request from Signup Validation",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Bad request from Signin Validation",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = { signupValidation, signinValidation };
