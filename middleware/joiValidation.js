const Joi = require("joi");

const conactValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(200).optional(),
    subject: Joi.string().min(5).max(100).required(),
    message: Joi.string().min(10).max(1000).required(),
  });
  return schema.validate(data);
};


module.exports.conactValidation = conactValidation;

