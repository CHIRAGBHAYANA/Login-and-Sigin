// joi is the most powerful schema description language and data validator for JavaScript.
const Joi = require("@hapi/joi");

const registrationValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
