const router = require("express").Router();
const CompanyLogo = require("../../model/company/CompanyLogo");
const fs = require("fs");
const path = require("path");
const EmployeeLogo = require("../../model/employee/EmployeeLogo");
const EmployeePANImage = require("../../model/employee/EmployeePANImage");
const EmployeeADHAARImage = require("../../model/employee/EmployeeADHAARImage");
const Punch = require("../../model/employee/Punch");
// Image access
let UPLOAD_PATH = "./uploads";
router.get("/:id", async (req, res, next) => {
  let imgId = req.params.id;
  const query = { _id: String(imgId) };
  console.log("query", query);
  try {
    const logo = await CompanyLogo.find(query).select();
    console.log(path.join(UPLOAD_PATH, logo[0].filename));
    res.setHeader("Content-Type", "image/jpeg");
    const fileName = logo[0].filename;
    fs.createReadStream(path.join(UPLOAD_PATH, fileName)).pipe(res);
  } catch (error) {
    console.log("catch ===>", error);
    res.status(400).json({ error });
  }
});

router.get("/EmpImages/:id", async (req, res, next) => {
  let imgId = req.params.id;
  const query = { _id: String(imgId) };
  console.log("query", query);
  try {
    const logo = await EmployeeLogo.find(query).select();
    console.log(path.join(UPLOAD_PATH, logo[0].filename));
    res.setHeader("Content-Type", "image/jpeg");
    const fileName = logo[0].filename;
    fs.createReadStream(path.join(UPLOAD_PATH, fileName)).pipe(res);
  } catch (error) {
    console.log("catch ===>", error);
    res.status(400).json({ error });
  }
});
/**
 * PAN card image route
 */
router.get("/PANImage/:id", async (req, res, next) => {
  let imgId = req.params.id;
  const query = { _id: String(imgId) };
  try {
    const logo = await EmployeePANImage.find(query).select();
    console.log(path.join(UPLOAD_PATH, logo[0].filename));
    res.setHeader("Content-Type", "image/jpeg");
    const fileName = logo[0].filename;
    fs.createReadStream(path.join(UPLOAD_PATH, fileName)).pipe(res);
  } catch (error) {
    console.log("catch ===>", error);
    res.status(400).json({ error });
  }
});
/**
 * Adhaar Card Image
 */
router.get("/ADHAARImage/:id", async (req, res, next) => {
  let imgId = req.params.id;
  const query = { _id: String(imgId) };
  try {
    const logo = await EmployeeADHAARImage.find(query).select();
    console.log(path.join(UPLOAD_PATH, logo[0].filename));
    res.setHeader("Content-Type", "image/jpeg");
    const fileName = logo[0].filename;
    fs.createReadStream(path.join(UPLOAD_PATH, fileName)).pipe(res);
  } catch (error) {
    console.log("catch ===>", error);
    res.status(400).json({ error });
  }
});

router.get("/punchIn/:id", async (req, res, next) => {
  let imgId = req.params.id;
  const query = { _id: String(imgId) };
  console.log("query", query);
  try {
    const logo = await Punch.find(query).select();
    res.setHeader("Content-Type", "image/jpeg");
    const fileName = logo[0].clockInImage;
    fs.createReadStream(path.join(UPLOAD_PATH, fileName)).pipe(res);
  } catch (error) {
    console.log("catch ===>", error);
    res.status(400).json({ error });
  }
});

router.get("/punchOut/:id", async (req, res, next) => {
  let imgId = req.params.id;
  const query = { _id: String(imgId) };
  console.log("query", query);
  try {
    const logo = await Punch.find(query).select();
    res.setHeader("Content-Type", "image/jpeg");
    const fileName = logo[0].clockOutImage;
    fs.createReadStream(path.join(UPLOAD_PATH, fileName)).pipe(res);
  } catch (error) {
    console.log("catch ===>", error);
    res.status(400).json({ error });
  }
});

module.exports = router;
