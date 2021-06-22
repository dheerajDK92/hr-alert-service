const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const del = require("del");
const multer = require("multer");

const {
  adminCompanyLogo,
} = require("./../../validation/admin/validation-admin");

const Company = require("../../model/company/Company");
const CompanyLogo = require("../../model/company/CompanyLogo");

let UPLOAD_PATH = "./uploads";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res, next) => {
  // Create a new image model and fill the properties
  const validateInputData = {};
  validateInputData.filename = req.file.filename;
  validateInputData.originalName = req.file.originalname;
  validateInputData.destination = req.file.destination;
  validateInputData.companyId = req.header("company-token");
  console.log("req.file", req.file);
  // validate the user
  const { error } = adminCompanyLogo(validateInputData);
  // throw validation errors
  if (error) {
    del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
      //
    });
    return res.status(400).json({ error: error.details[0].message });
  }

  let newImage = new CompanyLogo();
  newImage.filename = req.file.filename;
  newImage.originalName = req.file.originalname;
  newImage.destination = req.file.destination;
  newImage.companyId = req.header("company-token");

  newImage.save((err) => {
    if (err) {
      del([path.join(UPLOAD_PATH, newImage.filename)]).then((deleted) => {
        //
      });
      return res.sendStatus(400);
    }
    res.status(201).send({ newImage });
  });
});

// Get all uploaded images
// router.get("/images", (req, res, next) => {
//   // use lean() to get a plain JS object
//   // remove the version key from the response
//   CompanyLogo.find({}, "-__v")
//     .lean()
//     .exec((err, images) => {
//       if (err) {
//         res.sendStatus(400);
//       }

//       // Manually set the correct URL to each image
//       for (let i = 0; i < images.length; i++) {
//         var img = images[i];
//         img.url = req.protocol + "://" + req.get("host") + "/images/" + img._id;
//       }
//       res.json(images);
//     });
// });

// Get one image by its ID
router.get("/images/:id", (req, res, next) => {
  let imgId = req.params.id;

  CompanyLogo.findById(imgId, (err, image) => {
    if (err) {
      res.sendStatus(400);
    }
    // stream the image back by loading the file
    res.setHeader("Content-Type", "image/jpeg");
    fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
  });
});

// Delete one image by its ID
router.delete("/images/:id", (req, res, next) => {
  let imgId = req.params.id;

  CompanyLogo.findByIdAndRemove(imgId, (err, image) => {
    if (err && image) {
      res.sendStatus(400);
    }

    del([path.join(UPLOAD_PATH, image.filename)]).then((deleted) => {
      res.sendStatus(200);
    });
  });
});
module.exports = router;
