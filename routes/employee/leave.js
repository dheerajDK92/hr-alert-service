const router = require("express").Router();
const Mail = require("./../../config/mail");

// validation
const {
  employeeLeaveValidate,
  employeeLeaveUpdateValidate,
} = require("../../validation/employee/leave");

const EmployeeLeave = require("../../model/employee/EmployeeLeave");

// register route
router.post("/request", async (req, res) => {
  // validate the user
  const { error } = employeeLeaveValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // sent Mail - start
  //   const options = {
  //     from: req.body.email,
  //     to: process.env.adminMail,
  //     subject: "Leave Request",
  //     message: `
  //     Leave Request submitted by
  //     `
  //   };

  //   const mail = new Mail({
  //     from: options.from,
  //     to: options.to,
  //     subject: options.subject,
  //     message: options.message,
  //     successCallback: function (suc) {
  //       console.log("mail sent success");
  //     },
  //     errorCallback: function (err) {
  //       console.log("error: " + err);
  //     },
  //   });
  // sent Mail - end

  const leave = new EmployeeLeave({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    allDay: req.body.allDay,
    status: req.body.status,
    hrRemarks: req.body.hrRemarks,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const savedleave = await leave.save();
    // mail.send();
    res.json({ error: null, data: { leaveId: savedleave._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// update route
router.put("/update", async (req, res) => {
  // validate the user
  const { error } = employeeLeaveUpdateValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // // sent Mail - start
  // const options = {
  //   from: req.body.email,
  //   to: process.env.adminMail,
  //   subject: `Request of Reimbursement is ${req.body.status} from HR`,
  //   message: `Reimbursement Amount: ${req.body.amount} <br/>
  //   Reimbursement Type: ${req.body.reimbursementType} <br/>
  //   Expense Date: ${req.body.expenseDate} <br/>
  //   Employee Remarks: ${req.body.remarks} <br/>`,
  // };

  // const mail = new Mail({
  //   from: options.from,
  //   to: options.to,
  //   subject: options.subject,
  //   message: options.message,
  //   successCallback: function (suc) {
  //     console.log("mail sent success");
  //   },
  //   errorCallback: function (err) {
  //     console.log("error: " + err);
  //   },
  // });
  // // sent Mail - end
  const query = { _id: req.body._id };
  try {
    EmployeeLeave.updateOne(query, req.body, { upsert: true }, function (
      err,
      doc
    ) {
      if (err) return res.send(400, { error: err });

      // mail.send();
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
    const leaveDetails = await EmployeeLeave.find({
      employeeId: req.params.id,
    }).select("-__v").sort('-date');

    res.json({
      error: null,
      data: { details: leaveDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get All employee reimbursementDetails
router.get("/All/:companyId", async (req, res) => {
  try {
    const leaveDetails = await EmployeeLeave.find({
      companyId: req.params.companyId,
    }).select("-__v").sort('-date');

    res.json({
      error: null,
      data: { details: leaveDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
