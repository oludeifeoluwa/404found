const joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const registerValidatorSchema = joi.object({
  name: joi.string().max(50).min(3).required(),
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  username: joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  city: joi.string().required(), 
  state: joi.string().required(), 
});

const loginValidatorSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
});

const verifyValidatorSchema = joi.object({
  verificationToken: joi.string().required(),
  email: joi.string().email().required(),
});

const AgentRegisterSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  agencyName: joi.string().min(2).max(50).required(),
  contact: joi
    .string()
    .pattern(/^\d{11,20}$/)
    .required(),
  whatsapp: joi.string().min(11).max(20).optional(),
  areasCovered: joi.array().items(joi.string()).optional(),
  socialMedia: joi
    .object({
      instagram: joi.string().uri().optional(),
      facebook: joi.string().uri().optional(),
      twitter: joi.string().uri().optional(),
      linkedin: joi.string().uri().optional(),
    })
    .optional(),
  experience: joi.number().optional(),
});

exports.registerValidator = validator(registerValidatorSchema);
exports.agentRegisterValidator = validator(AgentRegisterSchema);
exports.loginValidator = validator(loginValidatorSchema);
exports.verifyValidator = validator(verifyValidatorSchema);
