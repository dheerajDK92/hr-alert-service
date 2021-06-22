const Joi = require("@hapi/joi");

const adminRegisterValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(1).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

const adminLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

const adminCompanyValidation = (data) => {
  const schema = Joi.object({
    companyName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    address: Joi.string().min(6).max(40).required(),
    address2: Joi.string(),
    pincode: Joi.string().length(6).required(),
    city: Joi.string().min(2).max(40).required(),
    state: Joi.string().min(2).max(40).required(),
    country: Joi.string().min(2).max(40).required(),
    EmpLimit: Joi.number().allow("").allow(null),
    description: Joi.string().min(2).max(4000).required(),
  });

  return schema.validate(data);
};

const adminCompanyUpdateValidation = (data) => {
  const schema = Joi.object({
    companyName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    address: Joi.string().min(6).max(40).required(),
    address2: Joi.string(),
    pincode: Joi.string().length(6).required(),
    city: Joi.string().min(2).max(40).required(),
    state: Joi.string().min(2).max(40).required(),
    country: Joi.string().min(2).max(40).required(),
    EmpLimit: Joi.number().allow("").allow(null),
    description: Joi.string().min(2).max(4000).required(),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

const adminCompanyLogo = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    filename: Joi.string().required(),
    originalName: Joi.string().required(),
    destination: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = {
  adminLoginValidation,
  adminRegisterValidation,
  adminCompanyValidation,
  adminCompanyUpdateValidation,
  adminCompanyLogo
};
