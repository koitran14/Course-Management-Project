const { getAllSubmissions, getAllSubmissionsByA_ID, getAllSubmissionsByUserID, createSubmission, deleteSubmission, getSubmissionFromUserByA_ID, grading } = require("../controllers/submission");

module.exports = function(app){
    app.get('/api/submission', getAllSubmissions);

    app.get('/api/submission/:id', getAllSubmissionsByA_ID);

    app.get('/api/submission/user/:id', getAllSubmissionsByUserID);

    app.get('/api/submission/:UserID/:A_ID', getSubmissionFromUserByA_ID);

    app.post('/api/submission', createSubmission);

    app.put('/api/submission', grading);
    
    app.delete('/api/submission/:UserID/:A_ID', deleteSubmission)
}