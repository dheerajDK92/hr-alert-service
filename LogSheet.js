const router = require("express").Router();
// validation
// const {
//   employeeBreakUpdateValidate,
//   employeeBreakValidate,
// } = require("../../validation/employee/Break");
// const Break = require("../../model/employee/Break");

// register route
router.post("/start", async (req, res) => {
  // validate the user
  //   const { error } = employeeBreakValidate(req.body);
  //   if (error) return res.status(400).json({ error: error.details[0].message });
  res.json({ error: null, data: { message: "Done" } });
  //   const breakTime = new Break({
  //     companyId: req.body.companyId,
  //     employeeId: req.body.employeeId,
  //     breakDate: req.body.breakDate,
  //     startTime: req.body.startTime,
  //     stopTime: req.body.stopTime,
  //   });
  //   try {
  //     const savedbreakTime = await breakTime.save();
  //     res.json({ error: null, data: { BreakId: savedbreakTime._id } });
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
});

module.exports = router;