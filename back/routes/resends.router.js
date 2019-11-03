const router = require("express").Router();

module.exports = {
  getAllResends,
  getResendById,
  deleteResendById,
  createResend,
  updateResend,
  getAllResenderLocations,
  getAllResendsByFromUser,
  getAllResendsByDestinationUser
} = require("../controlers/resends.controller");

router.get("/", getAllResends);
router.get("/locations", getAllResenderLocations);
router.get("/:id", getResendById);
router.get("/byFromUser/:id", getAllResendsByFromUser);
router.get("/byDestinationUser/:id", getAllResendsByDestinationUser);
router.delete("/:id", deleteResendById);
router.post("/", createResend);
router.put("/:id", updateResend);

module.exports = router;
