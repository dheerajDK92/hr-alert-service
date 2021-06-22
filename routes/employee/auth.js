const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Employee = require("../../model/employee/Employee");
const Company = require("../../model/company/Company");
const CompanyLogo = require("../../model/company/CompanyLogo");
const {
  registerValidation,
} = require("../../validation/employee/validation");
// validation
const { loginValidation } = require("../../validation/employee/validation");

// login route
router.post("/login", async (req, res) => {
  // validate the user
  const { error } = loginValidation(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await Employee.findOne({ email: req.body.email });
  const phone = await Employee.findOne({ phone: req.body.email });
  let FinalData;
  // throw error when email is wrong
  if (!user && !phone)
    return res.status(400).json({ error: "Email/Phone is wrong" });

  if (user) {
    FinalData = user;
  } else {
    FinalData = phone;
  }
  // check for password correctness
  const validPassword = req.body.password == FinalData.password;
  // await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" });

  // create token
  const token = jwt.sign(
    // payload data
    {
      empname: FinalData.empname,
      id: FinalData._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
      userid: FinalData._id,
    },
  });
});

router.get("/getCompany", async (req, res) => {
  try {
    const companies = await Company.find().select();
    // fetch logo details - start
    for (let i = 0; i < companies.length; i++) {
      const query = { companyId: String(companies[i]._id) };
      const logo = await CompanyLogo.find(query).select();
      if (logo.length > 0) {
        Object.assign(companies[i], {
          logo: String(logo[logo.length - 1].filename),
        });
        // Object.assign(companies[i], {logoID: String(path.join(UPLOAD_PATH, logo[logo.length - 1]._id))});
        Object.assign(companies[i], {
          logoID: String(
            `${process.env.apiHost}${process.env.apiDomain}:${
              process.env.apiPort
            }/images/${logo[logo.length - 1]._id}`
          ),
        });
      }
    }
    // fetch logo details - end

    res.json({ error: null, data: { companies: companies } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

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


module.exports = router;
