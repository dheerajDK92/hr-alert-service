const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    empname: Joi.string().min(1).max(255).required(),
    empID: Joi.string().min(1).max(255).required(),
    Site: Joi.string().min(1).max(255).required(),
    isReportingManager: Joi.boolean().allow(""),
    designation: Joi.string().max(255).allow(""),
    DOB: Joi.string().allow(""),
    DOJ: Joi.string().allow(""),
    DOL: Joi.string().allow(""),
    gender: Joi.string().max(255).allow(""),
    isHrAdmin: Joi.boolean().required(),
    isMonthlyCalculation: Joi.boolean().required(),
    companyId: Joi.string().max(2048).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().min(1).max(255).email().allow("").optional(),
    password: Joi.string().min(6).max(1024).required(),
    address: Joi.string().min(6).max(40).allow(""),
    address2: Joi.string().allow(""),
    pincode: Joi.string().length(6).allow(""),
    city: Joi.string().min(2).max(40).allow(""),
    state: Joi.string().min(2).max(40).allow(""),
    country: Joi.string().min(2).max(40).allow(""),
    description: Joi.string().min(2).max(4000).allow(""),
    startTime: Joi.string().allow(""),
    endtTime: Joi.string().allow(""),
    halfDayApplicable: Joi.boolean().allow(null),
    minHoursOfHalfDay: Joi.string().allow(""),
    maxHoursOfContinousWork: Joi.string().allow(""),
    weeklyOffs: Joi.array().allow(""),
    selfAttendanceMethod: Joi.string().allow(""),
    attendanceFromOffice: Joi.boolean().allow(null).allow(""),
    imageWithAttendance: Joi.boolean().allow(null).allow(""),
    fingerPrintAttendance: Joi.boolean().allow(null).allow(""),
    overTimeApplicable: Joi.boolean().allow(null).allow(""),
    BASIC: Joi.number().allow(null).allow(""),
    DA: Joi.number().allow(null).allow(""),
    SpecialAllowance: Joi.number().allow(null).allow(""),
    OtherAllowance: Joi.number().allow(null).allow(""),
    HRA: Joi.number().allow(null).allow(""),
    TotalEarning: Joi.number().allow(null).allow(""),
    ESICEmployer: Joi.number().allow(null).allow(""),
    EPFEmployer: Joi.number().allow(null).allow(""),
    ESICEmployee: Joi.number().allow(null).allow(""),
    EPFEmployee: Joi.number().allow(null).allow(""),
    PT: Joi.number().allow(null).allow(""),
    MLWF: Joi.number().allow(null).allow(""),
    OtherDeduction: Joi.number().allow(null).allow(""),
    TotalDeduction: Joi.number().allow(null).allow(""),
    NetTotal: Joi.number().allow(null).allow(""),
  });

  return schema.validate(data);
};

const updateEmpValidation = (data) => {
  const schema = Joi.object({
    empname: Joi.string().min(1).max(255).required(),
    empID: Joi.string().min(1).max(255).required(),
    Site: Joi.string().min(1).max(255).required(),
    isReportingManager: Joi.boolean().allow(""),
    designation: Joi.string().max(255).allow(""),
    DOB: Joi.string().max(255).allow(""),
    DOJ: Joi.string().max(255).allow(""),
    DOL: Joi.string().max(255).allow(""),
    gender: Joi.string().max(255).allow(""),
    isHrAdmin: Joi.boolean().required(),
    isMonthlyCalculation: Joi.boolean().required(),
    companyId: Joi.string().max(2048).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .allow(null).allow(""),
    email: Joi.string().min(1).max(255).email().allow("").optional(),
    password: Joi.string().min(3).max(1024).required(),
    address: Joi.string().min(0).max(100).allow(""),
    address2: Joi.string().allow(""),
    pincode: Joi.string().length(6).allow(""),
    city: Joi.string().min(2).max(40).allow(""),
    state: Joi.string().min(2).max(40).allow(""),
    country: Joi.string().min(2).max(40).allow(""),
    description: Joi.string().min(2).max(4000).allow(""),
    startTime: Joi.string().allow(""),
    endtTime: Joi.string().allow(""),
    halfDayApplicable: Joi.boolean().allow(null),
    minHoursOfHalfDay: Joi.string().allow(""),
    maxHoursOfContinousWork: Joi.string().allow(""),
    weeklyOffs: Joi.array().allow(""),
    selfAttendanceMethod: Joi.string().allow(""),
    attendanceFromOffice: Joi.boolean().allow(null).allow(""),
    imageWithAttendance: Joi.boolean().allow(null).allow(""),
    fingerPrintAttendance: Joi.boolean().allow(null).allow(""),
    overTimeApplicable: Joi.boolean().allow(null).allow(""),
    BASIC: Joi.number().allow(null).allow(""),
    DA: Joi.number().allow(null).allow(""),
    SpecialAllowance: Joi.number().allow(null).allow(""),
    OtherAllowance: Joi.number().allow(null).allow(""),
    HRA: Joi.number().allow(null).allow(""),
    TotalEarning: Joi.number().allow(null).allow(""),
    ESICEmployer: Joi.number().allow(null).allow(""),
    EPFEmployer: Joi.number().allow(null).allow(""),
    ESICEmployee: Joi.number().allow(null).allow(""),
    EPFEmployee: Joi.number().allow(null).allow(""),
    PT: Joi.number().allow(null).allow(""),
    MLWF: Joi.number().allow(null).allow(""),
    OtherDeduction: Joi.number().allow(null).allow(""),
    TotalDeduction: Joi.number().allow(null).allow(""),
    NetTotal: Joi.number().allow(null).allow(""),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).optional(),
    password: Joi.string().min(3).max(1024).required(),
  });

  return schema.validate(data);
};

const deleteEmpValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeLogoValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    filename: Joi.string().required(),
    originalName: Joi.string().required(),
    destination: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeFeedbackValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().allow("").optional(),
    phone: Joi.string().required(),
    description: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeReimbursementValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().allow("").optional(),
    phone: Joi.string().required(),
    remarks: Joi.string().required(),
    destination: Joi.string().required(),
    expenseDate: Joi.string().required(),
    origin: Joi.string().required(),
    reimbursementType: Joi.string().required(),
    amount: Joi.number().required(),
    hrRemarks: Joi.string().allow(""),
    status: Joi.string().allow(""),
    remarks: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeReimbursementUpdateValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().allow("").optional(),
    phone: Joi.string().required(),
    remarks: Joi.string().required(),
    destination: Joi.string().required(),
    expenseDate: Joi.string().required(),
    origin: Joi.string().required(),
    reimbursementType: Joi.string().required(),
    amount: Joi.number().required(),
    hrRemarks: Joi.string().allow(""),
    status: Joi.string().allow(""),
    remarks: Joi.string().required(),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeAdvanceValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().allow("").optional(),
    phone: Joi.string().required(),
    remarks: Joi.string().required(),
    expenseDate: Joi.string().required(),
    advanceType: Joi.string().required(),
    amount: Joi.number().required(),
    hrRemarks: Joi.string().allow(""),
    status: Joi.string().allow(""),
    remarks: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeAdvanceUpdateValidate = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    remarks: Joi.string().required(),
    expenseDate: Joi.string().required(),
    advanceType: Joi.string().required(),
    amount: Joi.number().required(),
    hrRemarks: Joi.string().allow(""),
    status: Joi.string().allow(""),
    remarks: Joi.string().required(),
    _id: Joi.string().required(),
  });

  return schema.validate(data);
};

const employeeBankDetailValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    name: Joi.string().required().allow(""),
    bankAccountNumber: Joi.string().required().allow(""),
    IFSC: Joi.string().required().allow(""),
    BRANCH: Joi.string().required().allow(""),
    BANK: Joi.string().required().allow(""),
    BANKCODE: Joi.string().required().allow(""),
    CENTRE: Joi.string().required().allow(""),
    CITY: Joi.string().required().allow(""),
    DISTRICT: Joi.string().required().allow(""),
    STATE: Joi.string().required().allow(""),
    ADDRESS: Joi.string().required().allow(""),
    CONTACT: Joi.string().required().allow(""),
    UPI: Joi.boolean().required().allow(""),
    RTGS: Joi.boolean().required().allow(""),
    NEFT: Joi.boolean().required().allow(""),
    IMPS: Joi.boolean().required().allow(""),
    MICR: Joi.string().allow(""),
    isVerified: Joi.boolean().required(),
  });

  return schema.validate(data);
};

const employeePANValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    PAN: Joi.string().required().allow(""),
    DOB: Joi.string().allow(""),
    status: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const employeeAdhaarValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    employeeId: Joi.string().required(),
    ADHAAR: Joi.number().required().allow(""),
    status: Joi.string().allow(""),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  updateEmpValidation,
  employeeLogoValidate,
  deleteEmpValidation,
  employeeFeedbackValidate,
  employeeReimbursementValidate,
  employeeReimbursementUpdateValidate,
  employeeAdvanceValidate,
  employeeAdvanceUpdateValidate,
  employeeBankDetailValidation,
  employeePANValidation,
  employeeAdhaarValidation,
};
