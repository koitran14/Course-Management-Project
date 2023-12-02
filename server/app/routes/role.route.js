const { getAllRoles, getRoleById, createRole, updateRoleByID, deleteRoleByID } = require("../controllers/role");

module.exports = function(app){
    app.get('/api/role', getAllRoles);

    app.get('/api/role/:id', getRoleById);

    app.post('/api/role', createRole);

    app.put('/api/role/:id', updateRoleByID);
    
    app.delete('/api/role/:id', deleteRoleByID); 
}