const Department = require('../models/department.model');
const model = new Department();

exports.getAllDepartments = async (req, res) => {
    model.getAll((err, data) => {
        res.send({result: data, error: err})
    })
};

//get base on id
exports.getDepartmentByID = async (req, res) => {
    model.getByID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};



