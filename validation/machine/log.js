const Joi = require("@hapi/joi");

const logTaskValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    areaOfWork: Joi.string().required(),
    generalCleaning: Joi.string().allow("").allow(null),
    DampMoping: Joi.string().allow("").allow(null),
    WashingSucrubbing: Joi.string().allow("").allow(null),
    LitterPicking: Joi.string().allow("").allow(null),
  });

  return schema.validate(data);
};

const updateLogTaskValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    areaOfWork: Joi.string().required(),
    generalCleaning: Joi.string().allow("").allow(null),
    DampMoping: Joi.string().allow("").allow(null),
    WashingSucrubbing: Joi.string().allow("").allow(null),
    LitterPicking: Joi.string().allow("").allow(null),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

const scheduleTaskValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    task: Joi.string().required(),
    taskFor: Joi.string().required(),
    taskDate: Joi.string().required(),
    status: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  logTaskValidation,
  updateLogTaskValidation,
  scheduleTaskValidation,
};
