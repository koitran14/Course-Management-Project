const Attachment = require('../models/attachment.model');
const model = new Attachment();

exports.getAllAttachments = async (req, res) => {
  model.getAll((err, data) => {
    res.send({result: data, error: err})
  })
}

exports.getAttachmentById = async (req, res) => {
  model.getByID( req.params.id, (err, data) => {
    res.send({ result: data, error: err})
  })
}

exports.createAttachment = async (req, res) => {
  model.create(req.body, function(err, data) {
    res.send({ result: data, error: err});
  })
}

exports.updateAttachmentByID = async (req, res) => {
  model.update(req.body, function(err, data) {
    res.send({ result: data, error: err });
  })
}

exports.deleteAttachmentByID = async (req, res) => {
  model.delete(req.params.id, function(err, data) {
    res.send({ result: data, error: err})
  })
}
