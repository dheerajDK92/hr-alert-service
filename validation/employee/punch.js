const Joi = require("@hapi/joi");

const employeePunchValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    punchDate: Joi.string().required(),
    startTime: Joi.string().required(),
    stopTime: Joi.string().allow("").allow(null),
    latitude: Joi.number().allow("").allow(null),
    longitude: Joi.number().allow("").allow(null),
    address: Joi.string().allow("").allow(null),
    clockInImage: Joi.string().allow("").allow(null),
    clockOutImage: Joi.string().allow("").allow(null),
  });

  return schema.validate(data);
};

const employeePunchUpdateValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    punchDate: Joi.string().required(),
    startTime: Joi.string().required(),
    stopTime: Joi.string().required(),
    latitude: Joi.number().allow("").allow(null),
    longitude: Joi.number().allow("").allow(null),
    address: Joi.string().allow("").allow(null),
    clockInImage: Joi.string().allow("").allow(null),
    clockOutImage: Joi.string().allow("").allow(null),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};


const employeeSalarySlip = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    month: Joi.string().required(),
    empName: Joi.string().required(),
    empId: Joi.string().required(),
    employeeId: Joi.string().required(),
    BASIC: Joi.string().required(),
    DA: Joi.string().required(),
    SpecialAllowance: Joi.string().required(),
    OtherAllowance: Joi.string().required(),
    GROSSEARNING: Joi.string().required(),
    EPFEmployee: Joi.string().required(),
    ESICEmployee: Joi.string().required(),
    PT: Joi.string().required(),
    MLWF: Joi.string().required(),
    OtherDeduction: Joi.string().required(),
    GROSSDEDUCION: Joi.string().required(),
    NETEARNING: Joi.string().required(),
  });

  return schema.validate(data);
};


const employeeMultipleSalarySlip = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    month: Joi.string().required(),
    empName: Joi.string().required(),
    employeeId: Joi.string().required(),
    BASIC: Joi.string().required(),
    DA: Joi.string().required(),
    HRA: Joi.string().required(),
    SpecialAllowance: Joi.string().allow(""),
    OtherAllowance: Joi.string().allow(""),
    OtherEarning: Joi.string().allow(""),
    WashAll: Joi.string().allow(""),
    GROSSEARNING: Joi.string().allow(""),
    PF: Joi.string().allow(""),
    ESICEmployee: Joi.string().allow(""),
    PTAX: Joi.string().allow(""),
    MLWF: Joi.string().allow(""),
    LoanDeduction: Joi.string().allow(""),
    AdvDeduction: Joi.string().allow(""),
    OtherDeduction: Joi.string().allow(""),
    GROSSDEDUCION: Joi.string().allow(""),
    NETEARNING: Joi.string().required(),
    SITE: Joi.string().allow(""),
    CHEQUE: Joi.string().allow(""),
    GROSSFIXED: Joi.string().allow(""),
    paidDays: Joi.string().allow(""),
    ConvAll: Joi.string().allow(""),
    ProdIncentive: Joi.string().allow(""),
  });
  return schema.validate(data);
};


module.exports = {
  employeePunchValidate,
  employeePunchUpdateValidate,
  employeeMultipleSalarySlip,
  employeeSalarySlip
};
