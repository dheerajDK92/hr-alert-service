const Joi = require("@hapi/joi");

const employeeBreakValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    breakDate: Joi.string().required(),
    startTime: Joi.string().required(),
    stopTime: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const employeeBreakUpdateValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    breakDate: Joi.string().required(),
    startTime: Joi.string().required(),
    stopTime: Joi.string().required(),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  employeeBreakValidate,
  employeeBreakUpdateValidate,
};
