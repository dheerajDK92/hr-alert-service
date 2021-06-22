const router = require("express").Router();
const Mail = require("./../../config/mail");

// validation
const {
  employeeFeedbackValidate,
} = require("../../validation/employee/validation");

const Feedback = require("../../model/employee/Feedback");

// register route
router.post("/", async (req, res) => {
  // validate the user
  const { error } = employeeFeedbackValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  // sent Mail - start
  const options = {
    from: req.body.email,
    to: process.env.adminMail,
    subject: "Feedback From Employee",
    message: req.body.description,
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

  const feedback = new Feedback({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
  });

  try {
    const savedFeedback = await feedback.save();
    mail.send();
    res.json({ error: null, data: { feedbackId: savedFeedback._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
