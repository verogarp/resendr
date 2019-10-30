const router = require("express").Router();

module.exports = {
  getAllResends,
  getResendById,
  deleteResendById,
  createResend,
  updateResend,
  getAllResenderLocations
} = require("../controlers/resends.controller");

router.get("/", getAllResends);
router.get("/locations", getAllResenderLocations);
router.get("/:id", getResendById);
router.delete("/:id", deleteResendById);
router.post("/", createResend);
router.put("/:id", updateResend);


module.exports = router;
