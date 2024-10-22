const db = require('../config')();

const LoginRegis = {
    RegisterUser: (UserDetail, callback) => {
        const sql = "INSERT INTO tb_user SET ?";
        db.query(sql, UserDetail, callback);
    },

    findUserByEmail: (email, callback) => {
        const sql = "SELECT id FROM tb_user WHERE email = ?";
        db.query(sql, [email], callback);
    },

    LoginUser: (email, callback) => {
        const sql = "SELECT id, fname, email, password FROM tb_user WHERE email = ?";
        db.query(sql, [email], callback);
    },
};

module.exports = LoginRegis;
