const router = require("express").Router();
// validation
const {
  employeeBreakUpdateValidate,
  employeeBreakValidate,
} = require("../../validation/employee/Break");
const Break = require("../../model/employee/Break");

// register route
router.post("/start", async (req, res) => {
  // validate the user
  const { error } = employeeBreakValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const breakTime = new Break({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    breakDate: req.body.breakDate,
    startTime: req.body.startTime,
    stopTime: req.body.stopTime,
  });
  try {
    const savedbreakTime = await breakTime.save();
    res.json({ error: null, data: { BreakId: savedbreakTime._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// update route
router.put("/stop", async (req, res) => {
  // validate the user
  const { error } = employeeBreakUpdateValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };
  try {
    Break.updateOne(query, req.body, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({
        error: null,
        data: { message: "SuccessFully Updated Break" },
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee Break
router.post("/fetch", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const BreakDetails = await Break.find({
      breakDate: req.body.breakDate,
      employeeId: req.body.employeeId,
    })
      .select("-__v")
      .sort("-date");
    res.json({
      error: null,
      data: { details: BreakDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee Break
router.post("/fetchCompanyEmployeeBreak", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    let BreakDetails;
    if (req.body.startFrom != "" && req.body.endTo != "") {
      BreakDetails = await Break.find({
        employeeId: req.body.employeeId,
        companyId: req.body.companyId,
        date: { $gte: req.body.startFrom, $lt: req.body.endTo },
      })
        .select("-__v")
        .sort("-date");
      res.json({
        error: null,
        data: { details: BreakDetails },
      });
    }else{
      BreakDetails = await Break.find({
        employeeId: req.body.employeeId,
        companyId: req.body.companyId,
      })
        .select("-__v")
        .sort("-date")
        .limit(60);
      res.json({
        error: null,
        data: { details: BreakDetails },
      });
    }
    
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get All employee Advance Details
// router.get("/All/:companyId", async (req, res) => {
//   try {
//     const advanceDetails = await Advance.find({
//       companyId: req.params.companyId,
//     }).select("-__v").sort('-date');

//     res.json({
//       error: null,
//       data: { advanceDetails: advanceDetails },
//     });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// });

module.exports = router;
