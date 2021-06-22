const router = require("express").Router();

// register route
router.post("/payment", async (req, res) => {
  // validate the user

  try {
    res.json({ error: null, data: { message: "Success" } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
