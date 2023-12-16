const { getAllAttachments, getAttachmentById, createAttachment, updateAttachmentByID, deleteAttachmentByID } = require("../controllers/attachment");

module.exports = function(app){
    app.get('/api/attachment', getAllAttachments);

    app.get('/api/attachment/:id', getAttachmentById);

    app.post('/api/attachment', createAttachment);

    app.put('/api/attachment/:id', updateAttachmentByID);
    
    app.delete('/api/attachment/:id', deleteAttachmentByID); 
}