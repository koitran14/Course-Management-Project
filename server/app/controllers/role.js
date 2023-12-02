const Role = require('../models/role.model');
const model = new Role();

exports.getAllRoles = async (req, res) => {
  model.getAll((err, data) => {
    res.send({result: data, error: err})
  })
}

exports.getRoleById = async (req, res) => {
  model.getByID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.createRole = async (req, res) => {
  model.create(req.body, function(err, data) {
    res.send({ result: data, error: err});
  })
}

exports.updateRoleByID = async (req, res) => {
  model.update(req.body, function(err, data) {
    res.send({ result: data, error: err });
  })
}

exports.deleteRoleByID = async (req, res) => {
  model.delete(req.params.id, function(err, data) {
    res.send({ result: data, error: err})
  })
}
