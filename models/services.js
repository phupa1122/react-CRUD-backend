const db = require("../config")();

const Service = {
  getAllService: (callback) => {
    const sql = `
           SELECT
  service.*,
  service_type.service_type_name
FROM
  service
  INNER JOIN service_type ON service.service_type_id =
service_type.service_type_id`;
    db.query(sql, callback);
  },
};

module.exports = Service;
