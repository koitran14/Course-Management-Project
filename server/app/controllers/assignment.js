const Assignment = require('../models/assignment.model');
const model = new Assignment();

exports.getAllAssignment = async (req, res) => {
    model.getAll((err, data) => {
        res.send({result: data, error: err})
    })
};

exports.getAssignmentByID = async (req, res) => {
    model.getByID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.getNearAssignmentsByUserId = async (req, res) => {
    model.getNearByUserID( req.params.id, (err, data) => {
      res.send({ result: data, error: err})
    })
  }

  exports.getNearAssignmentsByCourseID = async (req, res) => {
    model.getNearByCourseID( req.params.id, (err, data) => {
      res.send({ result: data, error: err})
    })
  }

exports.getAllAssignmentsByUserId = async (req, res) => {
    model.getAllByUserID( req.params.id, (err, data) => {
      res.send({ result: data, error: err})
    })
  }

exports.getAllAssignmentsByCourseID = async (req, res) => {
    model.getAllByCourseID( req.params.id, (err, data) => {
      res.send({ result: data, error: err})
    })
  }

exports.createAssignment = async (req, res) => {
    model.create(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.updateAssignment = async (req, res) => {
    model.update(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.deleteAssignmentByID = async (req, res) => {
    model.delete(req.params.id, function(err, data){
        res.send({result: data, error: err});
    })
};

