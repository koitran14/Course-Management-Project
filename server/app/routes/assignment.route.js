const { getAllAssignment, getAssignmentByID,getNearAssignmentsByCourseID, getAllAssignmentsByCourseID, getAllAssignmentsByUserId,getNearAssignmentsByUserId, createAssignment, updateAssignment, deleteAssignmentByID } = require("../controllers/assignment.js");

module.exports = function(app) {
    app.get('/api/assignment', getAllAssignment);

    app.get('/api/course/:id/assignment', getAllAssignmentsByCourseID);
    
    app.get('/api/assignment/:id', getAssignmentByID);

    app.get('/api/course/:id/assignment/near', getNearAssignmentsByCourseID);

    app.get('/api/student/:id/assignment/near', getNearAssignmentsByUserId);

    app.get('/api/student/:id/assignment', getAllAssignmentsByUserId);

    app.post('/api/assignment', createAssignment);

    app.put('/api/assignment/:id', updateAssignment);

    app.delete('/api/assignment/:id', deleteAssignmentByID);
};
