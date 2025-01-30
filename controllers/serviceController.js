const Service = require("../models/services");

// Get all employees
const getAllService = (req, res) => {
  Service.getAllService((error, result) => {
    if (error) {
      return res
        .status(500)
        .send({ status: false, error: "Database query failed" });
    }
    if (!result || result.length === 0) {
      return res
        .status(404)
        .send({ status: false, error: "No Services found!" });
    }
    res.send({ status: true, data: result });
  });
};

module.exports = { getAllService };
