
const db = require('../config')();

const Position = {

    getAllPosition: (callback) => {
        const sql = ` 
            SELECT 
                position_id,
                position_name,
                salary,
                phone_number
            FROM 
                tb_position`;
        db.query(sql, callback);
    },
    getOnePosition: (position_id, callback) => {
        const sql = "SELECT * FROM tb_position WHERE position_id = ?";
        db.query(sql, [position_id], callback);
    },

    addPosition: (PositionDetail, callback) => {
        const sql = "INSERT INTO tb_position SET ?";
        db.query(sql, PositionDetail, callback);
    },

    deletePosition: (position_id, callback) => {
        const sql = "DELETE FROM tb_position WHERE `tb_position`.`position_id` = ?"
        db.query(sql, [position_id], callback)
    },

    updatePosition: (position_id, PositionDetail, callback) => {
        const { position_name, salary, phone_number } = PositionDetail;
        const sql = `UPDATE tb_position 
                     SET position_name = ?,
                            salary = ?,
                            phone_number = ? 
                     WHERE position_id = ?`;
        db.query(sql, [position_name, salary, phone_number, position_id], callback)
    },

}

module.exports = Position