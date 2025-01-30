const db = require('../config')();

const Service = {

    getAllService: (callback) => {
        const sql = `
            SELECT * FROM service`;
        db.query(sql, callback);
    },
};


module.exports = Service;