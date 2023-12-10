const Announcement = require('../models/announcement.model');
const model = new Announcement();

exports.getAllAnnouncement = async (req, res) => {
    model.getAll((err, data) => {
        res.send({result: data, error: err})
    })
};

exports.getAnnouncementByID = async (req, res) => {
    model.getByID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.getAllAnnouncementsByCourseID = async (req, res) => {
    model.getAllByCourseID( req.params.id, (err, data) => {
      res.send({ result: data, error: err})
    })
  }

exports.createAnnouncement = async (req, res) => {
    model.create(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.updateAnnouncement = async (req, res) => {
    model.update(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.deleteAnnouncementByID = async (req, res) => {
    model.delete(req.params.id, function(err, data){
        res.send({result: data, error: err});
    })
};


