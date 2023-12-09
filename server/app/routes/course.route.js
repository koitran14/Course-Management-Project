const { getAllCourses, getCourseById, getAllCoursesByStudent_UserId, createCourse, updateCourseByID, deleteCourseByID } = require("../controllers/course.js");

module.exports = function(app){
    app.get('/api/course', getAllCourses);

    app.get('/api/course/:id', getCourseById);

    app.get('/api/:id/course/', getAllCoursesByStudent_UserId);

    app.post('/api/course', createCourse);

    app.put('/api/course/:id', updateCourseByID);
    
    app.delete('/api/course/:id', deleteCourseByID); 
}