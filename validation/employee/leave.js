const Joi = require("@hapi/joi");

const employeeLeaveValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().required().allow(""),
    phone: Joi.string().required().allow(""),
    hrRemarks: Joi.string().required().allow(""),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    reason: Joi.string().required(),
    allDay: Joi.boolean().required(),
    status: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeLeaveUpdateValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().required().allow(""),
    phone: Joi.string().required().allow(""),
    hrRemarks: Joi.string().required().allow(""),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    reason: Joi.string().required(),
    allDay: Joi.boolean().required(),
    status: Joi.string().required(),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  employeeLeaveValidate,
  employeeLeaveUpdateValidate,
};
