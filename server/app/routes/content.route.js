const { getAllContent, getContentByID, createContent, updateContent, deleteContentByID } = require("../controllers/content");

module.exports = function(app){
    app.get('/api/content', getAllContent);

    app.get('/api/content/:id', getContentByID);

    app.post('/api/content', createContent);

    app.put('/api/content/:id', updateContent);
    
    app.delete('/api/content/:id', deleteContentByID)

}