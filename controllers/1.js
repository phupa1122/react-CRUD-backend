const multer = require('multer');
const path = require('path');
const Employee = require('../models/employee');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

const getAllEmployee = (req, res) => {
    Employee.getAllEmployee((error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'No employees found!' });
        }
        else {
            res.send({ 
                status: true, 
                data: result 
            });
        }
    });
};

const getOneEmployee = (req, res) => {
    const id = req.params.employee_id;
    Employee.getOneEmployee(id, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'No employees found!' });
        }
        else {
            return res.send({
                status: true,
                emp_id: id,
                data: result[0]
            });
        }
    });
};

// const addEmployee = (req, res) => {
//     const EmployeeDetail = req.body
//     Employee.addEmployee(EmployeeDetail, (error, result) => {
//         if (error) {
//             return res.status(500).send({ status: false, error: 'Database query failed' });
//         }
//         else {
//             return res.send({
//                 status: true,
//                 message: 'Employee create successfully!'
//             })
//         }
//     })
// }

// const updateEmployee = (req, res) => {
//     const id = req.params.employee_id
//     const EmployeeDetail = {
//         employee_name: req.body.employee_name,
//         position_id: req.body.position_id,
//         salary: req.body.salary,
//         address: req.body.address,
//         phone_number: req.body.phone_number
//     }
//     Employee.updateEmployee(id, EmployeeDetail, (error, result) => {
//         if (error) {
//             return res.status(500).send({ status: false, error: 'Database query failed!' })
//         }
//         else if (result.length === 0) {
//             return res.status(404).send({ status: false, error: 'No employees found!' });
//         }
//         else {
//             return res.send({
//                 status: true,
//                 update_at: id, 
//                 message: `Updated employee id:` +id + ` successfully!` 
//             })
//         } 
//     })
// }
const addEmployeeWithImage = (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Image upload failed!' });
        }
        const EmployeeDetail = {
            employee_name: req.body.employee_name,
            position_id: req.body.position_id,
            salary: req.body.salary,
            address: req.body.address,
            phone_number: req.body.phone_number,
            image: req.file ? req.file.filename : null // Save the image filename if uploaded
        };

        Employee.addEmployee(EmployeeDetail, (dbError, result) => {
            if (dbError) {
                return res.status(500).send({ status: false, error: 'Database query failed' });
            }
            return res.send({ status: true, message: 'Employee created successfully!' });
        });
    });
};
const updateEmployeeWithImage = (req, res) => {
    const id = req.params.employee_id;
    
    upload(req, res, (error) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Image upload failed!' });
        }

        const EmployeeDetail = {
            employee_name: req.body.employee_name,
            position_id: req.body.position_id,
            salary: req.body.salary,
            address: req.body.address,
            phone_number: req.body.phone_number,
            image: req.file ? req.file.filename : null // Update image if uploaded
        };

        Employee.updateEmployee(id, EmployeeDetail, (dbError, result) => {
            if (dbError) {
                return res.status(500).send({ status: false, error: 'Database query failed!' });
            }
            return res.send({ status: true, message: `Updated employee id: ${id} successfully!` });
        });
    });
};

const deleteEmployee = (req, res) => {
    const id = req.params.employee_id
    Employee.deleteEmployee(id, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (result.length === 0) {
            return res.status(404).send({ status: false, error: 'No employees found!' });
        }
        else {
            res.send({
                status: true,
                message: `Deleted employee id:` +id + ` successfully!`,
            })
        }
    })
}



module.exports = { getAllEmployee, getOneEmployee,addEmployeeWithImage, deleteEmployee, updateEmployeeWithImage }