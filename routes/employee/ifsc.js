const router = require("express").Router();
const ifsc = require('ifsc');

// get single employee
router.get("/validate/:ifscCode", async (req, res) => {
  try {
    // const query = { _id: req.params.id };
    const ifscCode = req.params.ifscCode
    const result = await ifsc.fetchDetails(ifscCode);
    res.json({
      error: null,
      data: { result: result },
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
});

module.exports = router;
