const { getAllUsers, getUserByID, createUser, updateUser, deleteUserByID } = require("../controllers/user");

module.exports = function(app){
    app.get('/api/user', getAllUsers);

    app.get('/api/user/:id', getUserByID);

    app.post('/api/user', createUser);

    app.put('/api/user/:id', updateUser);
    
    app.delete('/api/user/:id', deleteUserByID)

}