const { getAllCourses, getCourseById, getAllCoursesByStudentId, getAllCoursesByTeacherId, createCourse, updateCourseByID, deleteCourseByID } = require("../controllers/course.js");

module.exports = function(app){
    app.get('/api/course', getAllCourses);

    app.get('/api/course/:id', getCourseById);

    app.get('/api/student/:id/course', getAllCoursesByStudentId);

    app.get('/api/teacher/:id/course', getAllCoursesByTeacherId);

    app.post('/api/course', createCourse);

    app.put('/api/course/:id', updateCourseByID);
    
    app.delete('/api/course/:id', deleteCourseByID); 
}