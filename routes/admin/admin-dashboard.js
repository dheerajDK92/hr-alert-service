const router = require("express").Router();
const {
  adminCompanyValidation,
  adminCompanyUpdateValidation,
} = require("../../validation/admin/validation-admin");
const Company = require("../../model/company/Company");
const CompanyLogo = require("../../model/company/CompanyLogo");
const Feedback = require("../../model/employee/Feedback");
const Mail = require("./../../config/mail");

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

router.post("/registerCompany", async (req, res) => {
  // validate the user
  const { error } = adminCompanyValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const isCompanyExist = await Company.findOne({
    companyName: req.body.companyName,
  });

  // throw error when email already registered
  if (isCompanyExist)
    return res.status(400).json({ error: "Company already exists" });

  const company = new Company({
    companyName: req.body.companyName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    address2: req.body.address2,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    EmpLimit: req.body.EmpLimit,
    description: req.body.description,
  });

  try {
    const savedCompany = await company.save();
    res.json({ error: null, data: { companyId: savedCompany._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// update
router.put("/updateCompany", async (req, res) => {
  // validate the user
  const { error } = adminCompanyUpdateValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };

  try {
    Company.updateOne(query, req.body, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({ error: null, data: { updatedCompanyData: req.body } });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/deleteCompany", async (req, res) => {
  // validate the user
  const { error } = adminCompanyUpdateValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };

  try {
    const updatedCompanyData = await Company.deleteOne(query, { upsert: true });
    res.json({
      error: null,
      data: { message: "SuccessFully Deleted", id: req.body._id },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get All Feedback
router.get("/getAllFeedback", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().select("-__v");
    res.json({ error: null, data: { feedback: feedbackList } });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error });
  }
});

// register route
router.post("/sendMail", async (req, res) => {
  const options = {
    from: req.body.email,
    to: process.env.adminMail,
    subject: `Feedback Response`,
    message: `Thank you for contacting with us<br/>
    Reply: ${req.body.message} <br/>`,
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
  try {
    mail.send();
    res.json({ error: null, data: { message: "success" } });
  } catch (error) {
    console.log("error",error)
    res.status(400).json({ error });
  }
});
module.exports = router;
