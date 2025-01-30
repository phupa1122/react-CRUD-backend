const express = require("express");
const router = express.Router();
const { getAllService } = require("../controllers/serviceController");

router.get("/service", getAllService);

module.exports = router;
