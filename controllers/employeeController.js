const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/employee');

// Absolute path to the uploads folder
const uploadsDir = path.join(__dirname, '../../frontend/uploads/');

// Configure multer for image upload storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use absolute path for the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp to avoid filename collisions
    }
});

const upload = multer({ storage: storage }).single('image');

// Get all employees
const getAllEmployee = (req, res) => {
    Employee.getAllEmployee((error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'No employees found!' });
        }
        res.send({ status: true, data: result });
    });
};

// Get one employee by ID
const getOneEmployee = (req, res) => {
    const id = req.params.employee_id;
    Employee.getOneEmployee(id, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'Employee not found!' });
        }
        res.send({ status: true, emp_id: id, data: result[0] });
    });
};

// Add a new employee with image upload
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

// Update an existing employee with optional image update
const updateEmployeeWithImage = (req, res) => {
    const id = req.params.employee_id;

    // Get the current employee details first
    Employee.getOneEmployee(id, (getError, result) => {
        if (getError || result.length === 0) {
            return res.status(500).send({ status: false, error: 'Employee not found or Database query failed!' });
        }

        const oldEmployee = result[0];
        const oldImagePath = path.join(uploadsDir, oldEmployee.image);

        // Process the image upload if available
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
                image: req.file ? req.file.filename : oldEmployee.image // Use new image if uploaded
            };

            Employee.updateEmployee(id, EmployeeDetail, (dbError, result) => {
                if (dbError) {
                    return res.status(500).send({ status: false, error: 'Database query failed!' });
                }

                // If a new image is uploaded, delete the old one
                if (req.file && oldEmployee.image && fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (unlinkError) => {
                        if (unlinkError) {
                            console.error('Error deleting old image:', unlinkError);
                        }
                    });
                }

                return res.send({ status: true, message: `Updated employee id: ${id} successfully!` });
            });
        });
    });
};

// Delete an employee and remove their image file
const deleteEmployee = (req, res) => {
    const id = req.params.employee_id;

    // Get the employee details first to find the image filename
    Employee.getOneEmployee(id, (getError, result) => {
        if (getError || result.length === 0) {
            return res.status(500).send({ status: false, error: 'Employee not found or Database query failed!' });
        }

        const employee = result[0];
        const imagePath = path.join(uploadsDir, employee.image);

        // Delete the employee from the database
        Employee.deleteEmployee(id, (deleteError, deleteResult) => {
            if (deleteError) {
                return res.status(500).send({ status: false, error: 'Database query failed' });
            }

            // If the employee had an image, delete the image file
            if (employee.image && fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (unlinkError) => {
                    if (unlinkError) {
                        console.error('Error deleting image:', unlinkError);
                    }
                });
            }

            return res.send({ status: true, message: `Deleted employee id: ${id} and image successfully!` });
        });
    });
};

module.exports = { getAllEmployee, getOneEmployee, addEmployeeWithImage, updateEmployeeWithImage, deleteEmployee };
