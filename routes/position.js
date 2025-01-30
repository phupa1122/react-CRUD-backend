const express = require("express");
const router = express.Router();
const {
  getAllPosition,
  getOnePosition,
  addPosition,
  updatePosition,
  deletePosition,
} = require("../controllers/positionController");

router.get("/position", getAllPosition); //read
router.get("/position/:position_id", getOnePosition); // select one
router.post("/position/add", addPosition); //create
router.put("/position/update/:position_id", updatePosition); //update
router.delete("/position/delete/:position_id", deletePosition); // delete
module.exports = router;
