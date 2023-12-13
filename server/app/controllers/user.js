const User = require('../models/user.model');
const model = new User();

exports.getAllUsers = async (req, res) => {
    model.getAll((err, data) => {
        res.send({result: data, error: err})
    })
};

//get base on id
exports.getUserByID = async (req, res) => {
    model.getByID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.getUserByLoginID = async (req, res) => {
    model.getByLoginID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.createUser = async (req, res) => {
    model.create(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.updateUser = async (req, res) => {
    model.update(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.deleteUserByID = async (req, res) => {
    model.delete(req.params.id, function(err, data){
        res.send({result: data, error: err});
    })
};


