const express = require("express");
const router = express.Router();
const {
  getAllEmployee,
  getOneEmployee,
  addEmployeeWithImage,
  updateEmployeeWithImage,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/employee", getAllEmployee);
router.get("/employee/:employee_id", getOneEmployee);
router.post("/employee/add", addEmployeeWithImage);
router.put("/employee/update/:employee_id", updateEmployeeWithImage);
router.delete("/employee/delete/:employee_id", deleteEmployee);
module.exports = router;
