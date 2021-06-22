const router = require("express").Router();
const Mail = require("../../config/mail");

// validation
const {
  employeeAdvanceValidate,
  employeeAdvanceUpdateValidate,
} = require("../../validation/employee/validation");
const Advance = require("../../model/employee/Advance");

// register route
router.post("/request", async (req, res) => {
  // validate the user
  const { error } = employeeAdvanceValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // sent Mail - start
  const options = {
    from: req.body.email,
    to: process.env.adminMail,
    subject: `Request of Advance(${req.body.advanceType}) from ${req.body.email}`,
    message: `Advance Type: ${req.body.advanceType} <br/>
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

  const advance = new Advance({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    email: req.body.email,
    phone: req.body.phone,
    expenseDate: req.body.expenseDate,
    advanceType: req.body.advanceType,
    amount: req.body.amount,
    remarks: req.body.remarks,
    hrRemarks: req.body.hrRemarks,
    status: req.body.status,
  });

  try {
    const savedadvance = await advance.save();
    mail.send();
    res.json({ error: null, data: { AdvanceId: savedadvance._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// update route
router.put("/update", async (req, res) => {
  // validate the user
  const { error } = employeeAdvanceUpdateValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // sent Mail - start
  const options = {
    from: req.body.email,
    to: process.env.adminMail,
    subject: `Request of Advance is ${req.body.status} from HR`,
    message: `Advance Amount: ${req.body.amount} <br/>
    Advance Type: ${req.body.advanceType} <br/>
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
    Advance.updateOne(query, req.body, { upsert: true }, function (
      err,
      doc
    ) {
      if (err) return res.send(400, { error: err });
      res.json({
        error: null,
        data: { message: "SuccessFully Updated Advance" },
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee advanceDetails
router.get("/fetch/:id", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const advanceDetails = await Advance.find({
      employeeId: req.params.id,
    }).select("-__v").sort('-date');

    res.json({
      error: null,
      data: { advanceDetails: advanceDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get All employee Advance Details
router.get("/All/:companyId", async (req, res) => {
  try {
    const advanceDetails = await Advance.find({
      companyId: req.params.companyId,
    }).select("-__v").sort('-date');

    res.json({
      error: null,
      data: { advanceDetails: advanceDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
