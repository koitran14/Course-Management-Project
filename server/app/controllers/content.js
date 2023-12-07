const Content = require('../models/content.model');
const model = new Content();

exports.getAllContent = async (req, res) => {
    model.getAll((err, data) => {
        res.send({result: data, error: err})
    })
};

//get base on id
exports.getContentByID = async (req, res) => {
    model.getByID(req.params.id, (err, data)=> {
        res.send({result: data, error: err})
    })
};

exports.createContent = async (req, res) => {
    model.create(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.updateContent = async (req, res) => {
    model.update(req.body, function(err, data){
        res.send({result: data, error: err});
    })
}

exports.deleteContentByID = async (req, res) => {
    model.delete(req.params.id, function(err, data){
        res.send({result: data, error: err});
    })
};


