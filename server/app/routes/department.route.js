const { getAllDepartments, getDepartmentByID} = require("../controllers/department");

module.exports = function(app){
    app.get('/api/department', getAllDepartments);

    app.get('/api/department/:id', getDepartmentByID);
}