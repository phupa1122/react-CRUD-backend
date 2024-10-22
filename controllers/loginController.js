
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginRegis = require('../models/login');
require('dotenv').config();
const saltRounds = 10;

const register = (req, res) => {
    LoginRegis.findUserByEmail(req.body.email, (err, existingUser) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "error", message: "Database error" });
        }
        if (existingUser.length > 0) {
            return res.status(401).json({ status: "error", message: "Email already exists" });
        }
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Error hashing password" });
            }
            const UserDetail = {
                fname: req.body.fname,
                email: req.body.email,
                password: hash
            };
            LoginRegis.RegisterUser(UserDetail, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ status: "error", message: "Database error" });
                }
                return res.json({ status: "ok" });
            });
        });
    });
};

const login = (req, res) => {
    LoginRegis.LoginUser(req.body.email, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "error", message: "Database error" });
        }

        if (user.length === 0) {
            return res.status(401).json({ status: "error", message: "Email not found" });
        }

        bcrypt.compare(req.body.password, user[0].password, (err, isLogin) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Error comparing passwords" });
            }

            if (isLogin) {
                const secret_token = process.env.ACCESS_TOKEN;
                const token = jwt.sign({ email: user[0].email }, secret_token, { expiresIn: '1h' });
                return res.json({
                    status: "ok",
                    message: "Login successful",
                    token: token
                });
            } else {
                return res.status(401).json({ status: "error", message: "Login failed" });
            }
        });
    });
};

const authenticate = (req, res) => {
    try {
        const secret_token = process.env.ACCESS_TOKEN;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret_token);
        return res.json({ status: "ok", decoded });
    } catch (error) {
        return res.status(401).json({ status: "error", message: "Invalid token" });
    }
};

module.exports = { register, login, authenticate };
