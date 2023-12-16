const Assignment = require('../models/assignment.model');
const model = new Assignment();

exports.getAllAssignments = async (req, res) => {
  model.getAll((err, data) => {
    res.send({result: data, error: err})
  })
}

exports.getAssignmentById = async (req, res) => {
  model.getByID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.getAssignmentByCourseId = async (req, res) => {
  model.getByCourseID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.createAssignment = async (req, res) => {
  model.create(req.body, function(err, data) {
    res.send({ result: data, error: err});
  })
}

exports.updateAssignmentByID = async (req, res) => {
  model.update(req.body, function(err, data) {
    res.send({ result: data, error: err });
  })
}

exports.deleteAssignmentByID = async (req, res) => {
  model.delete(req.params.id, function(err, data) {
    res.send({ result: data, error: err})
  })
}
