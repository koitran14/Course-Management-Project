const Course = require('../models/course.model');
const model = new Course();

exports.getAllCourses = async (req, res) => {
  model.getAll((err, data) => {
    res.send({result: data, error: err})
  })
}

exports.getCourseById = async (req, res) => {
  model.getByID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.getAllCoursesByStudentId = async (req, res) => {
  model.getAllByStudentID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.getAllCoursesByTeacherId = async (req, res) => {
  model.getAllByTeacherID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.createCourse = async (req, res) => {
  model.create(req.body, function(err, data) {
    res.send({ result: data, error: err});
  })
}

exports.updateCourseByID = async (req, res) => {
  model.update(req.body, function(err, data) {
    res.send({ result: data, error: err });
  })
}

exports.deleteCourseByID = async (req, res) => {
  model.delete(req.params.id, function(err, data) {
    res.send({ result: data, error: err})
  })
}
