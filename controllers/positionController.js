const Position = require('../models/position')

const getAllPosition = (req, res) => {
    Position.getAllPosition((error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'No position found!' });
        }
        res.send({ status: true, data: result })
    })
}

const getOnePosition = (req, res) => {
    const id = req.params.position_id;
    Position.getOnePosition(id, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'No position found!' });
        } else {
            return res.send({
                status: true,
                emp_id: id,
                data: result[0]
            });
        }
    });
}


const addPosition = (req, res) => {
    const PositionDetail = req.body;
    Position.addPosition(PositionDetail, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (!result || result.length === 0) {
            return res.status(404).send({ status: false, error: 'No position found!' });
        }
        else {
            return res.send({
                status: true,
                message: 'Position create successfully'
            });
        }
    });
}

const deletePosition= (req, res) => {
    const id = req.params.position_id;
    Position.deletePosition(id, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        else if (result.length === 0) {
            return res.status(404).send({ status: false, error: 'No position found!' });
        }
        else {
            res.send({
                status: true,
                message: `Deleted position id: ` +id + ` successfully!`,
            })
        }
    });
};

const updatePosition = (req, res) => {
    const id = req.params.position_id; 
    const PositionDetail = {
        position_name: req.body.position_name,
        salary: req.body.salary,
        phone_number: req.body.phone_number
    }; 

    Position.updatePosition(id , PositionDetail, (error, result) => {
        if (error) {
            return res.status(500).send({ status: false, error: 'Database query failed!' })
        }
        else if (result.length === 0) {
            return res.status(404).send({ status: false, error: 'No position found!' });
        }
        else {
            return res.send({ 
                status: true,
                update_at: id, 
                message: `Updated position id:` +id + ` successfully!` 
            });
        }
    });
};

module.exports = { getAllPosition, getOnePosition, addPosition,deletePosition,updatePosition }