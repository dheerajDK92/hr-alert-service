const router = require("express").Router();
const Mail = require("./../../config/mail");

// validation
const {
  employeeReimbursementValidate,
  employeeReimbursementUpdateValidate,
} = require("../../validation/employee/validation");
const Reimbursement = require("../../model/employee/Reimbursement");

// register route
router.post("/request", async (req, res) => {
  // validate the user
  const { error } = employeeReimbursementValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // sent Mail - start
  const options = {
    from: req.body.email,
    to: process.env.adminMail,
    subject: `Request of Reimbursement(${req.body.reimbursementType}) from ${req.body.email}`,
    message: `Reimbursement Amount: ${req.body.amount} <br/>
    Reimbursement Type: ${req.body.reimbursementType} <br/>
    Expense Date: ${req.body.expenseDate} <br/>
    Employee Remarks: ${req.body.remarks} <br/>`,
  };

  const mail = new Mail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    message: options.message,
    successCallback: function (suc) {
      console.log("mail sent success");
    },
    errorCallback: function (err) {
      console.log("error: " + err);
    },
  });
  // sent Mail - end

  const reimburse = new Reimbursement({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    email: req.body.email,
    phone: req.body.phone,
    destination: req.body.destination,
    expenseDate: req.body.expenseDate,
    origin: req.body.origin,
    reimbursementType: req.body.reimbursementType,
    amount: req.body.amount,
    remarks: req.body.remarks,
    hrRemarks: req.body.hrRemarks,
    status: req.body.status,
  });

  try {
    const savedReimburse = await reimburse.save();
    mail.send();
    res.json({ error: null, data: { ReimburseID: savedReimburse._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// update route
router.put("/update", async (req, res) => {
  // validate the user
  const { error } = employeeReimbursementUpdateValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // sent Mail - start
  const options = {
    from: req.body.email,
    to: process.env.adminMail,
    subject: `Request of Reimbursement is ${req.body.status} from HR`,
    message: `Reimbursement Amount: ${req.body.amount} <br/>
    Reimbursement Type: ${req.body.reimbursementType} <br/>
    Expense Date: ${req.body.expenseDate} <br/>
    Employee Remarks: ${req.body.remarks} <br/>`,
  };

  const mail = new Mail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    message: options.message,
    successCallback: function (suc) {
      console.log("mail sent success");
    },
    errorCallback: function (err) {
      console.log("error: " + err);
    },
  });
  // sent Mail - end
  const query = { _id: req.body._id };
  try {
    Reimbursement.updateOne(query, req.body, { upsert: true }, function (
      err,
      doc
    ) {
      if (err) return res.send(400, { error: err });
      res.json({
        error: null,
        data: { message: "SuccessFully Updated Reimbursement" },
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee reimbursementDetails
router.get("/fetch/:id", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const reimbursementDetails = await Reimbursement.find({
      employeeId: req.params.id,
    }).select("-__v").sort('-date');

    res.json({
      error: null,
      data: { reimbursementDetails: reimbursementDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get All employee reimbursementDetails
router.get("/All/:companyId", async (req, res) => {
  try {
    const reimbursementDetails = await Reimbursement.find({
      companyId: req.params.companyId,
    }).select("-__v").sort('-date');

    res.json({
      error: null,
      data: { reimbursementDetails: reimbursementDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
