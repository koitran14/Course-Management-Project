const { getAllAssignments, getAssignmentById, createAssignment, updateAssignmentByID, deleteAssignmentByID, getAssignmentByCourseId } = require("../controllers/assignment");

module.exports = function(app){
    app.get('/api/assignment', getAllAssignments);

    app.get('/api/assignment/:id', getAssignmentById);

    app.get('/api/assignment/course/:id', getAssignmentByCourseId);

    app.post('/api/assignment', createAssignment);

    app.put('/api/assignment/:id', updateAssignmentByID);
    
    app.delete('/api/assignment/:id', deleteAssignmentByID); 
}