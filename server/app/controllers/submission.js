const Submission = require('../models/submission.model');
const model = new Submission();

exports.getAllSubmissions = async(req, res) => {
    model.getAll((err, data) => {
        res.send({ result: data, error: err});
    });
}


exports.getAllSubmissionsByA_ID = async(req, res) => {
    model.getAllByA_ID(req.params.id, (err, data) => {
        res.send({ result: data, error: err});
    });
}

exports.getAllSubmissionsByUserID = async(req, res) => {
    model.getAllByUserID(req.params.id, (err, data) => {
        res.send({ result: data, error: err});
    });
}

exports.getSubmissionFromUserByA_ID = async (req, res) => {
    try {
        const { submissionInfo, attachments } = await model.getSubmissionOfUserIDByA_ID(req.params.UserID, req.params.A_ID);

        res.send({
            result: {
                submissionInfo,
                attachments
            },
            error: null
        });
    } catch (error) {
        res.status(500).send({
            result: null,
            error: error.message
        });
    }
};


exports.createSubmission = async(req, res) => {
    model.create(req.body, (err, data) => {
        res.send({ result: data, error: err});
    });
}

exports.deleteSubmission = async(req, res) => {
    model.delete(req.params.UserID, req.params.A_ID, (err, data) => {
        res.send({ result: data, error: err});
    });
}