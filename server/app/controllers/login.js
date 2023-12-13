const Login = require('../models/login.model');
const model = new Login();

exports.getAllLogin = async (req, res) => {
    model.getAll((err, data) => {
        res.send({result: data, error: err})
    })
};

exports.getLoginByUserName = async (req, res) => {
    model.getByUserName(req.params.username, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.getLoginByID = async (req, res) => {
    model.getByID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.createLogin = async (req, res) => {
    model.create(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.updateLogin = async (req, res) => {
    model.update(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.deleteLoginByID = async (req, res) => {
    model.delete(req.params.id, function(err, data){
        res.send({result: data, error: err});
    })
};


