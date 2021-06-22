const router = require("express").Router();
const Mail = require("./../../config/mail");
const fs = require("fs");
const mime = require("mime");

// validation
const {
  employeePunchValidate,
  employeePunchUpdateValidate,
  employeeSalarySlip,
  employeeMultipleSalarySlip
} = require("../../validation/employee/punch");

const Punch = require("../../model/employee/Punch");
const Employee = require("../../model/employee/Employee");
const EmployeeSalarySlip = require("../../model/employee/EmployeeSalary");

// register route
router.post("/start", async (req, res) => {
  // validate the user
  const { error } = employeePunchValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const punchTime = new Punch({
    companyId: req.body.companyId,
    employeeId: req.body.employeeId,
    punchDate: req.body.punchDate,
    startTime: req.body.startTime,
    stopTime: req.body.stopTime,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address,
    clockInImage: req.body.clockInImage,
    clockOutImage: req.body.clockOutImage,
  });
  try {
    const savedpunchTime = await punchTime.save();
    res.json({ error: null, data: { PunchId: savedpunchTime._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// start multiple

router.post("/startMultiple", async (req, res) => {
  // validate the user
  try {
    for (let i = 0; i < req.body.data.length; i++) {
      let punchTime = new Punch({
        companyId: req.body.data[i].companyId,
        employeeId: req.body.data[i]._id,
        punchDate: req.body.data[i].punchDateSelected,
        // punchOutDate: req.body.data[i].punchOutDateSelected,
        startTime: req.body.data[i].punchStartTime,
        stopTime: req.body.data[i].punchStopTime,
        latitude: "",
        longitude: "",
        address: "",
        clockInImage: "",
        clockOutImage: "",
      });
      const savedpunchTime = await punchTime.save();
    }

    res.json({ error: null, data: { message: "successfully added" } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const uploadImage = async (req, res, next) => {
  // to declare some path to store your converted image
  const { error } = employeePunchValidate(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  var matches = req.body.clockInImage.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.extension(type);
  let fileName =
    Date.now() + Math.random().toString(26).slice(2) + "." + extension;
  try {
    const imageWait = await fs.writeFileSync(
      "./uploads/" + fileName,
      imageBuffer,
      "utf8"
    );
    const punchTime = new Punch({
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      punchDate: req.body.punchDate,
      // punchOutDate: req.body.punchOutDate,
      startTime: req.body.startTime,
      stopTime: req.body.stopTime,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      clockInImage: fileName,
      clockOutImage: req.body.clockOutImage,
    });
    const savedpunchTime = await punchTime.save();
    res.json({ error: null, data: { PunchId: savedpunchTime._id } });
  } catch (e) {
    next(e);
  }
};

// start punch route
router.post("/startWithImage", uploadImage);

const uploadImageForOut = async (req, res, next) => {
  // to declare some path to store your converted image
  const { error } = employeePunchUpdateValidate(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  var matches = req.body.clockOutImage.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.extension(type);
  let fileName =
    Date.now() + Math.random().toString(26).slice(2) + "." + extension;
  try {
    const imageWait = await fs.writeFileSync(
      "./uploads/" + fileName,
      imageBuffer,
      "utf8"
    );
    const punchData = {
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      punchDate: req.body.punchDate,
      // punchOutDate: req.body.punchOutDate,
      startTime: req.body.startTime,
      stopTime: req.body.stopTime,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      clockInImage: req.body.clockInImage,
      clockOutImage: fileName,
      _id: req.body._id,
    };
    const query = { _id: req.body._id };
    Punch.updateOne(query, punchData, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({
        error: null,
        data: { message: "SuccessFully Updated Punch" },
      });
    });
  } catch (e) {
    next(e);
  }
};

// stop punch route
router.put("/stopWithImage", uploadImageForOut);

// update route
router.put("/stop", async (req, res) => {
  // validate the user
  const { error } = employeePunchUpdateValidate(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };
  try {
    Punch.updateOne(query, req.body, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({
        error: null,
        data: { message: "SuccessFully Updated Punch" },
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
    const PunchDetails = await Punch.find({
      punchDate: req.body.punchDate,
      employeeId: req.body.employeeId,
    })
      .select("-__v")
      .sort("-date");
    res.json({
      error: null,
      data: { details: PunchDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee Break
router.post("/fetchTodaySitePunch", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const PunchDetails = await Punch.find({
      punchDate: req.body.punchDate,
      companyId: req.body.companyId,
    }).select("-__v");
    for (let i = 0; i < PunchDetails.length; i++) {
      const query = { _id: String(PunchDetails[i].employeeId) };
      const employee = await Employee.find(query).select();
      if (employee.length > 0) {
        Object.assign(PunchDetails[i], { employeeDetail: employee });
      }
    }
    res.json({
      error: null,
      data: { details: PunchDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee Break
router.post("/empFetch", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    let PunchDetails;
    if (req.body.startFrom != "" && req.body.endTo != "") {
      PunchDetails = await Punch.find({
        employeeId: req.body.employeeId,
        companyId: req.body.companyId,
        date: { $gte: req.body.startFrom, $lt: req.body.endTo },
      })
        .select("-__v")
        .sort("-date");
    } else {
      PunchDetails = await Punch.find({
        employeeId: req.body.employeeId,
        companyId: req.body.companyId,
      })
        .select("-__v")
        .sort("-date")
        .limit(60);
    }

    for (let i = 0; i < PunchDetails.length; i++) {
      PunchDetails[i].clockInImage = String(
        `${process.env.apiHost}${process.env.apiDomain}:${process.env.apiPort}/images/punchIn/${PunchDetails[i]._id}`
      );
      PunchDetails[i].clockOutImage = String(
        `${process.env.apiHost}${process.env.apiDomain}:${process.env.apiPort}/images/punchOut/${PunchDetails[i]._id}`
      );
    }

    res.json({
      error: null,
      data: { details: PunchDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get single employee Break
router.post("/DashboardEmpFetch", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const PunchDetails = await Punch.find({
      employeeId: req.body.employeeId,
      companyId: req.body.companyId,
      punchDate: req.body.breakDate,
    })
      .select("-__v")
      .sort("-date");
    for (let i = 0; i < PunchDetails.length; i++) {
      // PunchDetails[i].clockInImage = String(
      //   `${process.env.apiHost}${process.env.apiDomain}:${process.env.apiPort}/images/punchIn/${PunchDetails[i]._id}`
      // );
      // PunchDetails[i].clockOutImage = String(
      //   `${process.env.apiHost}${process.env.apiDomain}:${process.env.apiPort}/images/punchOut/${PunchDetails[i]._id}`
      // );
    }

    res.json({
      error: null,
      data: { details: PunchDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
/**
 * Salary Slip
 */
router.post("/sendSalarySlip", async (req, res) => {
  // validate the user
  const { error } = employeeSalarySlip(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const slipDetail = await EmployeeSalarySlip.find({
    employeeId: req.body.employeeId,
    month: req.body.month,
    companyId: req.body.companyId,
  });
  console.log("slipDetail", slipDetail)
  if (slipDetail.length === 0) {
    /**
     * Insert Data
     */
    const SalarySlip = new EmployeeSalarySlip(req.body);
    try {
      const SalarySlipSaved = await SalarySlip.save();
      res.json({ error: null, data: { SalarySlipId: SalarySlipSaved._id } });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    /**
     * Update Data
     */
    const query = { month: req.body.month, employeeId: req.body.employeeId };
    try {
      EmployeeSalarySlip.updateOne(query, req.body, { upsert: true }, function (
        err,
        doc
      ) {
        if (err) return res.send(400, { error: err });
        res.json({
          error: null,
          data: { message: "SuccessFully Updated Salary Slip" },
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
});





/**
 * Salary Slip
 */
router.post("/sendMultipleSalarySlip", async (req, res) => {
  // validate the user
  // const { error } = employeeMultipleSalarySlip(req.body.data);

  // // throw validation errors
  // if (error) return res.status(400).json({ error: error.details[0].message });
  let errorMessage = [];

  for (let i = 0; i < req.body.data.length; i++) {
    console.log("===>", )
    const slipDetail = await EmployeeSalarySlip.find({
      employeeId: req.body.data[i].employeeId,
      month: req.body.data[i].month,
      companyId: req.body.data[i].companyId,
    });
    if (slipDetail.length === 0) {
      /**
       * Insert Data
       */
      // insertArray.push(req.body);
      const SalarySlip = new EmployeeSalarySlip(req.body.data[i]);
      try {
        const SalarySlipSaved = await SalarySlip.save();
      } catch (error) {
        errorMessage.push(error)
        // res.status(400).json({ error });
      }
    } else {
      /**
       * Update Data
       */
      // updateArray.push(req.body);
      const query = { month: req.body.month, empUID: req.body.empUID };
      try {
        const updated = await EmployeeSalarySlip.findOneAndUpdate(
          query,
          req.body.data[i],
          {new: true}
        ).exec();
      } catch (error) {
        errorMessage.push(error)
        // res.status(400).json({ error });
      }
    }
  }
  res.json({
    error: errorMessage,
    data: { message: "SuccessFully Updated Salary Slip" },
  });
});


router.get("/getSalarySlips/:id", async (req, res) => {
  const query = { employeeId: req.params.id };
  try {
    const slips = await EmployeeSalarySlip.find(query).select().sort("date");
    res.json({ error: null, data: { salarySlips: slips } });
  } catch (error) {
    res.status(400).json({ error });
  }
});


router.post("/getSalaryByMonth", async (req, res) => {
  const query = { companyID: req.body.companyId, month: req.body.month };
  try {
    const slips = await EmployeeSalarySlip.find(query).select().sort("SITE");
    res.json({ error: null, data: { salaryDetails: slips } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/deleteMultiplePunched", async (req, res) => {
  const query = { _id: req.body.data };
  try {
    const updatedCompanyData = await Punch.deleteMany(query, {
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



router.delete("/deleteEmployeeCalculatedSalaries", async (req, res) => {
  const query = { _id: req.body.data };
  try {
    const updatedCompanyData = await EmployeeSalarySlip.deleteMany(query, {
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

module.exports = router;
