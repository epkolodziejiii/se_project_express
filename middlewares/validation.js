const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri"); // Triggers "string.uri" error
};

//1. The clothing item body when an item is created

const createItemValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "string.only": "Weather must be hot, warm, or cold",
      "string.required": "Weather is required",
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

// 2. User creation (signup)
const createUserValidator = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().email().lowercase().required().messages({
      "string.email": 'the "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": 'The minimum length of the "password" field is 6',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 3. Login
const loginValidator = celebrate({
  body: Joi.object({
    email: Joi.string().email().lowercase().required().messages({
      "string.email": 'the "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 4. IDs (params) - MongoDB ObjectId format
const idValidator = celebrate({
  params: Joi.object({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": 'the "itemId" field must be a valid hex string',
      "string.length": 'the "itemId" field must be exactly 24 characters',
      "string.empty": 'The "itemId" field must be filled in',
    }),
  }),
});

module.exports = {
  createItemValidation,
  createUserValidator,
  loginValidator,
  idValidator,
};
