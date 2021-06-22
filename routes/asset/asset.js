const router = require("express").Router();
// validation
const { AddAssetValidation } = require("../../validation/asset/asset");
const Asset = require("../../model/asset/asset");
/**
 * add Asset routes - start
 */
// register route
router.post("/addAsset", async (req, res) => {
  // validate the user
  const { error } = AddAssetValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const AddAsset = new Asset({
    companyId: req.body.companyId,
    assetName: req.body.assetName,
    assetCategory: req.body.assetCategory,
    assetPrice: req.body.assetPrice,
  });
  try {
    const savedAddAsset = await AddAsset.save();
    res.json({ error: null, data: { AssetId: savedAddAsset._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/updateAsset", async (req, res) => {
  // validate the user
  const { error } = updateLogAssetValidation(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const query = { _id: req.body._id };

  try {
    Asset.updateOne(query, req.body, { upsert: true }, function (err, doc) {
      if (err) return res.send(400, { error: err });
      res.json({ error: null, data: { updatedAssetData: req.body } });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/deleteAsset", async (req, res) => {
  // throw validation errors
  if (req.body._id == "" || req.body._id == null)
    return res.status(400).json({ error: "ID is required" });

  const query = { _id: req.body._id };

  try {
    const updatedLogAssetData = await Asset.deleteOne(query, {
      upsert: true,
    });
    res.json({
      error: null,
      data: { message: "SuccessFully Deleted", id: req.body._id },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/loadAsset/:companyId", async (req, res) => {
  try {
    const AssetDetails = await Asset.find({
      companyId: req.params.companyId,
    })
      .select("-__v")
      .sort("-date");

    res.json({
      error: null,
      data: { AssetDetails: AssetDetails },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
