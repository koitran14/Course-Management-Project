const Attachment = require('../models/attachment.model');
const model = new Attachment();

exports.getAllAttachments = async (req, res) => {
  model.getAll((err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.getAttachmentById = async (req, res) => {
  model.getByID(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.getAttachmentsOfAnnouncement = async (req, res) => {
  model.getByAnID(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.getAttachmentsOfContent = async (req, res) => {
  model.getByConID(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.getAttachmentsOfAssignment = async (req, res) => {
  model.getByA_ID(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.getAttachmentsOfSubmission = async (req, res) => {
  model.getBySubmissionID(req.params.UserID, req.params.A_ID, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.createAnnouncementAttachment = async (req, res) => {
  model.createAnnouncementAttachment(req.body, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.createNewAttachment = async(req, res) => {
  model.createAttachment(req.body, (err,data) => {
    res.send({ result: data, error: err});
  })
}

exports.createAssignmentAttachment = async (req, res) => {
  model.createAssignmentAttachment(req.body, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.createContentAttachment = async (req, res) => {
  model.createContentAttachment(req.body, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.updateAnnouncementAttachmentByID = async (req, res) => {
  model.updateAnnouncementAttachment(req.params.id, req.body, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.updateAssignmentAttachmentByID = async (req, res) => {
  model.updateAssignmentAttachment(req.params.id, req.body, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.updateContentAttachmentByID = async (req, res) => {
  model.updateContentAttachment(req.params.id, req.body, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.deleteAnnouncementAttachmentByID = async (req, res) => {
  model.deleteAnnouncementAttachment(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.deleteAttachmentByID = async (req, res) => {
  model.deleteByID(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.deleteAssignmentAttachmentByID = async (req, res) => {
  model.deleteAssignmentAttachment(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

exports.deleteContentAttachmentByID = async (req, res) => {
  model.deleteContentAttachment(req.params.id, (err, data) => {
    res.send({ result: data, error: err });
  });
};

