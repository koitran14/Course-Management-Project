const { getAllLogin,getLoginByUserName, createLogin, updateLogin, deleteLoginByID } = require("../controllers/login");

module.exports = function(app){
    app.get('/api/login', getAllLogin);

    app.get('/api/login/:username', getLoginByUserName);

    app.post('/api/login', createLogin);

    app.put('/api/login/:username', updateLogin);
    
    app.delete('/api/login/:id', deleteLoginByID)

}