const Joi = require("@hapi/joi");

//Validation
const registrationValidation = data => {
  const Schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(5)
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(data, Schema)
};

const loginValidation = data => {
    const Schema = {
      email: Joi.string()
        .min(5)
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .required()
    };
    return Joi.validate(data, Schema)
  };

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
