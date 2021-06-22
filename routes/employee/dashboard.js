const router = require("express").Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const del = require("del");
const multer = require("multer");
const Employee = require("../../model/employee/Employee");
const EmployeeLogo = require("../../model/employee/EmployeeLogo");
const EmployeePANImage = require("../../model/employee/EmployeePANImage");
const EmployeeADHAARImage = require("../../model/employee/EmployeeADHAARImage");
const EmployeePAN = require("../../model/employee/EmployeePAN");
const EmployeeADHAAR = require("../../model/employee/EmployeeAdhaar");
const EmployeeBank = require("../../model/employee/EmployeeBank");

// validation
const {
  registerValidation,
  updateEmpValidation,
  employeeLogoValidate,
  deleteEmpValidation,
} = require("../../validation/employee/validation");
const CompanyLogo = require("../../model/company/CompanyLogo");
const Company = require("../../model/company/Company");
const Punch = require("../../model/employee/Punch");
// dashboard route
router.get("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "My dashboard",
      content: "dashboard content",
      user: req.user,
    },
  });
});

router.get("/getEmployeeList/:id", async (req, res) => {
  const query = { companyId: req.params.id };
  try {
    const emp = await Employee.find(query).select().sort("empname");

    for (let i = 0; i < emp.length; i++) {
      // emp[i].password = await cryptr.hash(req.body.password, salt)
      const query = { employeeId: String(emp[i]._id) };
      const logo = await EmployeeLogo.find(query).select();
      if (logo.length > 0) {
        Object.assign(emp[i], { logo: String(logo[logo.length - 1].filename) });
        Object.assign(emp[i], {
          logoID: String(
            `${process.env.apiHost}${process.env.apiDomain}:${
              process.env.apiPort
            }/images/EmpImages/${logo[logo.length - 1]._id}`
          ),
        });
      }
    }

    res.json({ error: null, data: { employeeList: emp } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/getDeletedEmployeeList", async (req, res) => {
  const query = { companyId: { $nin: req.body } };

  try {
    const emp = await Employee.find(query).select().sort("empname");
    for (let i = 0; i < emp.length; i++) {
      // emp[i].password = await cryptr.hash(req.body.password, salt)
      const query = { employeeId: String(emp[i]._id) };
      const logo = await EmployeeLogo.find(query).select();
      if (logo.length > 0) {
        Object.assign(emp[i], { logo: String(logo[logo.length - 1].filename) });
        Object.assign(emp[i], {
          logoID: String(
            `${process.env.apiHost}${process.env.apiDomain}:${
              process.env.apiPort
            }/images/EmpImages/${logo[logo.length - 1]._id}`
          ),
        });
      }
    }

    res.json({ error: null, data: { employeeList: emp } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/getCompanyEmployee/:id", async (req, res) => {
  const query = { companyId: req.params.id };
  try {
    const emp = await Employee.find(query).select().sort("empname");
    // "email empname gender phone description DOB DOJ -_id"

    for (let i = 0; i < emp.length; i++) {
      // emp[i].password = await cryptr.hash(req.body.password, salt)
      const query = { employeeId: String(emp[i]._id) };
      const logo = await EmployeeLogo.find(query).select();
      if (logo.length > 0) {
        Object.assign(emp[i], { logo: String(logo[logo.length - 1].filename) });
        Object.assign(emp[i], {
          logoID: String(
            `${process.env.apiHost}${process.env.apiDomain}:${
              process.env.apiPort
            }/images/EmpImages/${logo[logo.length - 1]._id}`
          ),
        });
      }
    }
    res.json({ error: null, data: { employeeList: emp } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee
router.get("/getEmployee/:id", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const emp = await Employee.find({ _id: req.params.id })
      .select()
      .sort("empname");
    const cmpLogo = await CompanyLogo.find({
      companyId: emp[0].companyId,
    }).select();
    const query = { employeeId: String(emp[0]._id) };
    const logo = await EmployeeLogo.find(query).select();
    if (cmpLogo.length > 0) {
      Object.assign(emp[0], {
        logo: String(
          `${process.env.apiHost}${process.env.apiDomain}:${
            process.env.apiPort
          }/images/${cmpLogo[cmpLogo.length - 1]._id}`
        ),
      });
    }
    if (logo.length > 0) {
      Object.assign(emp[0], {
        logoID: String(
          `${process.env.apiHost}${process.env.apiDomain}:${
            process.env.apiPort
          }/images/EmpImages/${logo[logo.length - 1]._id}`
        ),
      });
    }
    const companyDetail = await Company.find({ _id: emp[0].companyId }).select(
      " -date"
    );
    res.json({
      error: null,
      data: { employeeData: emp, CompanyDetail: companyDetail },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// register route
router.post("/register", async (req, res) => {
  // validate the user
  const { error } = registerValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  let isEmailMobileExist;
  if (req.body.email != "") {
    isEmailMobileExist = await Employee.findOne({
      companyId: req.body.companyId,
      email: req.body.email
    });
  }
  let isPhoneMobileExist;
  if (req.body.phone != "") {
    isPhoneMobileExist = await Employee.findOne({
      companyId: req.body.companyId,
      phone: req.body.phone
    });
  }
  // const isPhoneExist = await Employee.findOne({ phone: req.body.phone });
  // // throw error when email already registered
  if (isEmailMobileExist || isPhoneMobileExist)
    return res.status(400).json({ error: "Phone/Email already exists" });

  // hash the password
  // const salt = await bcrypt.genSalt(10);
  // const password = await bcrypt.hash(req.body.password, salt);

  const emp = new Employee({
    empname: req.body.empname,
    empID: req.body.empID,
    Site: req.body.Site,
    isReportingManager: req.body.isReportingManager,
    designation: req.body.designation,
    DOB: req.body.DOB,
    DOJ: req.body.DOJ,
    DOL: req.body.DOL,
    gender: req.body.gender,
    isHrAdmin: req.body.isHrAdmin,
    isMonthlyCalculation: req.body.isMonthlyCalculation,
    companyId: req.body.companyId,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    address2: req.body.address2,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    description: req.body.description,
    startTime: req.body.startTime,
    endtTime: req.body.endtTime,
    halfDayApplicable: req.body.halfDayApplicable,
    minHoursOfHalfDay: req.body.minHoursOfHalfDay,
    maxHoursOfContinousWork: req.body.maxHoursOfContinousWork,
    weeklyOffs: req.body.weeklyOffs,
    selfAttendanceMethod: req.body.selfAttendanceMethod,
    attendanceFromOffice: req.body.attendanceFromOffice,
    imageWithAttendance: req.body.imageWithAttendance,
    fingerPrintAttendance: req.body.fingerPrintAttendance,
    overTimeApplicable: req.body.overTimeApplicable,
    BASIC: req.body.BASIC,
    DA: req.body.DA,
    SpecialAllowance: req.body.SpecialAllowance,
    OtherAllowance: req.body.OtherAllowance,
    HRA: req.body.HRA,
    TotalEarning: req.body.TotalEarning,
    ESICEmployer: req.body.ESICEmployer,
    EPFEmployer: req.body.EPFEmployer,
    ESICEmployee: req.body.ESICEmployee,
    EPFEmployee: req.body.EPFEmployee,
    PT: req.body.PT,
    MLWF: req.body.MLWF,
    OtherDeduction: req.body.OtherDeduction,
    TotalDeduction: req.body.TotalDeduction,
    NetTotal: req.body.NetTotal,
  });

  try {
    const savedUser = await emp.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// registerMultiple route
router.post("/registerMultiple", async (req, res) => {
  // validate the user
  // const { error } = registerValidation(req.body);

  // throw validation errors
  // if (error) return res.status(400).json({ error: error.details[0].message });
  let Message = [];
  for (let itm of req.body) {
    let isEmailMobileExist;
    if (itm.email != "") {
      isEmailMobileExist = await Employee.findOne({
        email: itm.email,
        companyId: itm.companyId,
      });
    }
    let isPhoneMobileExist;
    if (itm.phone != "") {
      isPhoneMobileExist = await Employee.findOne({
        phone: itm.phone,
        companyId: itm.companyId,
      });
    }

    // throw error when email already registered
    if (isEmailMobileExist || isPhoneMobileExist) {
      Message.push({
        error: true,
        email: itm.email,
        phone: itm.phone,
        empID: itm.empID,
      });
    } else {
      Message.push({
        error: null,
        email: itm.email,
        phone: itm.phone,
        empID: itm.empID,
      });
      //  hash the password
      // const salt = await bcrypt.genSalt(10);
      // let password = await bcrypt.hash(itm.password, salt);
      const emp = new Employee({
        empname: itm.empname,
        empID: itm.empID,
        Site: itm.Site,
        isReportingManager: req.body.isReportingManager,
        designation: itm.designation,
        DOB: itm.DOB,
        DOJ: itm.DOJ,
        DOL: itm.DOL,
        gender: itm.gender,
        isHrAdmin: itm.isHrAdmin,
        isMonthlyCalculation: req.body.isMonthlyCalculation,
        companyId: itm.companyId,
        phone: itm.phone,
        email: itm.email,
        password: itm.password,
        address: itm.address,
        address2: itm.address2,
        pincode: itm.pincode,
        city: itm.city,
        state: itm.state,
        country: itm.country,
        description: itm.description,
        startTime: itm.startTime,
        endtTime: itm.endtTime,
        halfDayApplicable: itm.halfDayApplicable,
        minHoursOfHalfDay: itm.minHoursOfHalfDay,
        maxHoursOfContinousWork: itm.maxHoursOfContinousWork,
        weeklyOffs: itm.weeklyOffs,
        selfAttendanceMethod: itm.selfAttendanceMethod,
        attendanceFromOffice: itm.attendanceFromOffice,
        imageWithAttendance: itm.imageWithAttendance,
        fingerPrintAttendance: itm.fingerPrintAttendance,
        overTimeApplicable: itm.overTimeApplicable,
        BASIC: itm.BASIC,
        DA: itm.DA,
        SpecialAllowance: itm.SpecialAllowance,
        OtherAllowance: itm.OtherAllowance,
        HRA: itm.HRA,
        TotalEarning: itm.TotalEarning,
        ESICEmployer: itm.ESICEmployer,
        EPFEmployer: itm.EPFEmployer,
        ESICEmployee: itm.ESICEmployee,
        EPFEmployee: itm.EPFEmployee,
        PT: itm.PT,
        MLWF: itm.MLWF,
        OtherDeduction: itm.OtherDeduction,
        TotalDeduction: itm.TotalDeduction,
        NetTotal: itm.NetTotal,
      });
      const savedUser = await emp.save();
      if (itm.PAN != "") {
        const employeePAN = new EmployeePAN({
          companyId: itm.companyId,
          employeeId: savedUser._id,
          PAN: itm.PAN,
          DOB: "",
          status: "",
        });
        const savedemployeePAN = await employeePAN.save();
      }

      if (itm.Aadhaar != "") {
        const employeeADHAAR = new EmployeeADHAAR({
          companyId: itm.companyId,
          employeeId: savedUser._id,
          ADHAAR: itm.Aadhaar,
          status: "",
        });
        const savedemployeeAdhaar = await employeeADHAAR.save();
      }

      const employeeBank = new EmployeeBank({
        companyId: itm.companyId,
        employeeId: savedUser._id,
        name: itm.BankName,
        bankAccountNumber: itm.BankName,
        IFSC: itm.IFSC,
        BRANCH: "",
        BANK: itm.BankName,
        BANKCODE: "",
        CENTRE: "",
        CITY: "",
        DISTRICT: "",
        STATE: "",
        ADDRESS: "",
        CONTACT: "",
        UPI: false,
        RTGS: false,
        NEFT: false,
        IMPS: false,
        MICR: "",
        isVerified: false,
      });
      const savedEmployeeBank = await employeeBank.save();
    }
  }
  try {
    res.json({ error: null, message: Message });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Employee
router.put("/updateEmployee", async (req, res) => {
  // validate the user
  const { error } = updateEmpValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };

  try {
    Employee.updateOne(query, req.body, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({
        error: null,
        data: { message: "SuccessFully Updated Employee" },
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Employee
router.delete("/deleteEmployee", async (req, res) => {
  // validate the user
  const { error } = deleteEmpValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };

  try {
    const updatedCompanyData = await Employee.deleteOne(query, {
      upsert: true,
    });
    res.json({
      error: null,
      data: { message: "SuccessFully Deleted", id: req.body._id },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Employee
router.delete("/deleteMultiple", async (req, res) => {
  const query = { _id: req.body.data };
  try {
    const updatedCompanyData = await Employee.deleteMany(query, {
      upsert: true,
    });
    res.json({
      error: null,
      data: { message: "SuccessFully Deleted" },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/* Upload Employee profile Pic - start */
let UPLOAD_PATH = "./uploads";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({ storage: storage });

router.post("/uploadPic", upload.single("file"), (req, res, next) => {
  // Create a new image model and fill the properties
  const validateInputData = {};
  validateInputData.filename = req.file.filename;
  validateInputData.originalName = req.file.originalname;
  validateInputData.destination = req.file.destination;
  validateInputData.companyId = req.header("company-id");
  validateInputData.employeeId = req.header("employee-id");
  // validate the user
  const { error } = employeeLogoValidate(validateInputData);
  // throw validation errors
  if (error) {
    del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
      //
    });
    return res.status(400).json({ error: error.details[0].message });
  }

  let newImage = new EmployeeLogo();
  newImage.filename = req.file.filename;
  newImage.originalName = req.file.originalname;
  newImage.destination = req.file.destination;
  newImage.companyId = req.header("company-id");
  newImage.employeeId = req.header("employee-id");

  newImage.save((err) => {
    if (err) {
      del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
        //
      });
      return res.sendStatus(400);
    }
    res.status(201).send({ newImage });
  });
});

/**Upload PAN */
router.post("/uploadPAN", upload.single("file"), (req, res, next) => {
  // Create a new image model and fill the properties
  const validateInputData = {};
  validateInputData.filename = req.file.filename;
  validateInputData.originalName = req.file.originalname;
  validateInputData.destination = req.file.destination;
  validateInputData.companyId = req.header("company-id");
  validateInputData.employeeId = req.header("employee-id");
  // validate the user
  const { error } = employeeLogoValidate(validateInputData);
  // throw validation errors
  if (error) {
    del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
      //
    });
    return res.status(400).json({ error: error.details[0].message });
  }

  let newImage = new EmployeePANImage();
  newImage.filename = req.file.filename;
  newImage.originalName = req.file.originalname;
  newImage.destination = req.file.destination;
  newImage.companyId = req.header("company-id");
  newImage.employeeId = req.header("employee-id");

  newImage.save((err) => {
    if (err) {
      del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
        //
      });
      return res.sendStatus(400);
    }
    res.status(201).send({ newImage });
  });
});

/**Upload PAN */
router.post("/uploadADHAAR", upload.single("file"), (req, res, next) => {
  // Create a new image model and fill the properties
  const validateInputData = {};
  validateInputData.filename = req.file.filename;
  validateInputData.originalName = req.file.originalname;
  validateInputData.destination = req.file.destination;
  validateInputData.companyId = req.header("company-id");
  validateInputData.employeeId = req.header("employee-id");
  // validate the user
  const { error } = employeeLogoValidate(validateInputData);
  // throw validation errors
  if (error) {
    del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
      //
    });
    return res.status(400).json({ error: error.details[0].message });
  }

  let newImage = new EmployeeADHAARImage();
  newImage.filename = req.file.filename;
  newImage.originalName = req.file.originalname;
  newImage.destination = req.file.destination;
  newImage.companyId = req.header("company-id");
  newImage.employeeId = req.header("employee-id");

  newImage.save((err) => {
    if (err) {
      del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
        //
      });
      return res.sendStatus(400);
    }
    res.status(201).send({ newImage });
  });
});

/* Upload Employee profile Pic - end */

/** Fetch Employee Monthly Attendance */

router.post("/getMonthlyAttendance", async (req, res) => {
  console.log(req.body);
  const query = {
    employeeId: req.body.employeeId,
    date: {
      $gte: new Date(req.body.year, req.body.month, 1),
      $lt: new Date(req.body.year, req.body.month, req.body.lastDate),
    },
  };
  try {
    const emp = await Punch.find(query).select();
    res.json({ error: null, data: { punchDetails: emp } });
  } catch (error) {
    res.status(400).json({ error });
  }
});
/** Fetch Employee Monthly Attendacne */
module.exports = router;
