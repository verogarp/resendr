const router = require("express").Router();

module.exports = {
  getAllResends,
  getResendById,
  deleteResendById,
  createResend,
  updateResend,
  getAllResenderLocations,
  getAllResendsByFromUser,
  getAllResendsByDestinationUser,
  updateConfirm,
  updateReject
} = require("../controlers/resends.controller");

router.get("/", getAllResends);
router.get("/locations", getAllResenderLocations);
router.get("/:id", getResendById);
router.get("/byFromUser/:id", getAllResendsByFromUser);
router.get("/byDestinationUser/:id", getAllResendsByDestinationUser);
router.delete("/:id", deleteResendById);
router.post("/", createResend);
router.post("/confirm/:id/:price", updateConfirm);
router.post("/reject/:id/:reason", updateReject);
router.put("/:id", updateResend);

module.exports = router;
