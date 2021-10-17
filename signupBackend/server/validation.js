// joi is the schema description language and data validator for JavaScript.
const JoiValidation = require("@hapi/joi");

const registrationValidation = (data) => {
  const schema = JoiValidation.object({
    fullName: JoiValidation.string().required(),
    username: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = JoiValidation.object({
    email: JoiValidation.string().min(6).required().email(),
    password: JoiValidation.string().min(6).required(),
  });
  return schema.validate(data);
};
module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
