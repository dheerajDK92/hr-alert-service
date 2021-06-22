const router = require("express").Router();
const ifsc = require("ifsc");
const {
  employeeBankDetailValidation,
  employeePANValidation,
  employeeAdhaarValidation,
} = require("../../validation/employee/validation");
const EmployeeBank = require("../../model/employee/EmployeeBank");
const EmployeePAN = require("../../model/employee/EmployeePAN");
const EmployeePANImage = require("../../model/employee/EmployeePANImage");
const EmployeeADHAARImage = require("../../model/employee/EmployeeADHAARImage");
const EmployeeADHAAR = require("../../model/employee/EmployeeAdhaar");
// save Bank Account Details
router.post("/saveBankDetails", async (req, res) => {
  // res.json({ error: null, data: req.body });
  const { error } = employeeBankDetailValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  const query = { employeeId: req.body.employeeId };
  const isBankDetailAvailable = await EmployeeBank.find(query);
  if (isBankDetailAvailable.length > 0) {
    try {
      EmployeeBank.updateOne(query, req.body, { upsert: true }, function (
        err,
        doc
      ) {
        if (err) return res.send(400, { error: err });
        res.json({
          error: null,
          data: { message: "Success" },
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    const employeeBank = new EmployeeBank({
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      name: req.body.name,
      bankAccountNumber: req.body.bankAccountNumber,
      IFSC: req.body.IFSC,
      BRANCH: req.body.BRANCH,
      BANK: req.body.BANK,
      BANKCODE: req.body.BANKCODE,
      CENTRE: req.body.CENTRE,
      CITY: req.body.CITY,
      DISTRICT: req.body.DISTRICT,
      STATE: req.body.STATE,
      ADDRESS: req.body.ADDRESS,
      CONTACT: req.body.CONTACT,
      UPI: req.body.UPI,
      RTGS: req.body.RTGS,
      NEFT: req.body.NEFT,
      IMPS: req.body.IMPS,
      MICR: req.body.MICR,
      isVerified: req.body.isVerified,
    });
    try {
      const savedEmployeeBank = await employeeBank.save();
      res.json({
        error: null,
        data: { savedEmployeeBank: savedEmployeeBank._id },
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

// get Bank Account
router.get("/getBankDetails/:empId", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const empId = req.params.empId;
    const query = { employeeId: empId };
    const isBankDetailAvailable = await EmployeeBank.find(query).select(
      "-__v -_id"
    );
    res.json({
      error: null,
      data: { result: isBankDetailAvailable },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * Add PAN
 */
// save Bank Account Details
router.post("/savePAN", async (req, res) => {
  // res.json({ error: null, data: req.body });
  const { error } = employeePANValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  const query = { employeeId: req.body.employeeId };
  const isPANAvailable = await EmployeePAN.find(query);
  if (isPANAvailable.length > 0) {
    try {
      EmployeePAN.updateOne(query, req.body, { upsert: true }, function (
        err,
        doc
      ) {
        if (err) return res.send(400, { error: err });
        res.json({
          error: null,
          data: { message: "Success" },
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    const employeePAN = new EmployeePAN({
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      PAN: req.body.PAN,
      DOB: req.body.DOB,
      status: req.body.status,
    });
    try {
      const savedemployeePAN = await employeePAN.save();
      res.json({
        error: null,
        data: { savedemployeePAN: savedemployeePAN._id },
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});
/**
 * details for pan card
 */
router.get("/getPANDetails/:empId", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const empId = req.params.empId;
    const query = { employeeId: empId };
    const isPANAvailable = await EmployeePAN.find(query).select("-__v -_id");
    res.json({
      error: null,
      data: { result: isPANAvailable },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
/**
 * get the pan card document details
 */
router.get("/getPANImageDetails/:empId", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const empId = req.params.empId;
    const query = { employeeId: empId };
    const isPANAvailable = await EmployeePANImage.find(query).select("-__v");
    res.json({
      error: null,
      data: { result: isPANAvailable },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
/**
 * Get the adhaar card details
 */
router.get("/getADHAARImageDetails/:empId", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const empId = req.params.empId;
    const query = { employeeId: empId };
    const isPANAvailable = await EmployeeADHAARImage.find(query).select("-__v");
    res.json({
      error: null,
      data: { result: isPANAvailable },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * Add ADHAAR
 */
// save Bank Account Details
router.post("/saveADHAAR", async (req, res) => {
  // res.json({ error: null, data: req.body });
  const { error } = employeeAdhaarValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  const query = { employeeId: req.body.employeeId };
  const isAdhaarAvailable = await EmployeeADHAAR.find(query);
  if (isAdhaarAvailable.length > 0) {
    try {
      EmployeeADHAAR.updateOne(query, req.body, { upsert: true }, function (
        err,
        doc
      ) {
        if (err) return res.send(400, { error: err });
        res.json({
          error: null,
          data: { message: "Success" },
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    const employeeADHAAR = new EmployeeADHAAR({
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      ADHAAR: req.body.ADHAAR,
      status: req.body.status,
    });
    try {
      const savedemployeeAdhaar = await employeeADHAAR.save();
      res.json({
        error: null,
        data: { savedemployeeAdhaar: savedemployeeAdhaar._id },
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});

router.get("/getADHAARDetails/:empId", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const empId = req.params.empId;
    const query = { employeeId: empId };
    const isADHAARAvailable = await EmployeeADHAAR.find(query).select(
      "-__v -_id"
    );
    res.json({
      error: null,
      data: { result: isADHAARAvailable },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
