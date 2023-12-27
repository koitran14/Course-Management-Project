const { getAllAttachments, getAttachmentById, createAssignmentAttachment, createAnnouncementAttachment, updateAssignmentAttachmentByID, updateAnnouncementAttachmentByID, updateAssignmentSubmissionByID, deleteAnnouncementAttachmentByID, deleteAssignmentAttachmentByID, deleteContentAttachmentByID, deleteAssignmentSubmissionByID, createContentAttachment, createAssignmentSubmission, getAttachmentsOfAnnouncement, getAttachmentsOfContent, getAttachmentsOfAssignment, getAttachmentsOfSubmission, createNewAttachment, deleteAttachmentByID } = require("../controllers/attachment");

module.exports = function(app){
    app.get('/api/attachment', getAllAttachments);

    app.get('/api/attachment/:id', getAttachmentById);

    app.get('/api/attachment/announcement/:id', getAttachmentsOfAnnouncement);

    app.get('/api/attachment/content/:id', getAttachmentsOfContent);

    app.get('/api/attachment/assignment/:id', getAttachmentsOfAssignment);

    app.post('/api/attachment', createNewAttachment);

    app.post('/api/attachment/announcement', createAnnouncementAttachment);

    app.post('/api/attachment/assignment', createAssignmentAttachment);

    app.post('/api/attachment/content', createContentAttachment);

    app.put('/api/attachment/assignment/:id', updateAssignmentAttachmentByID);

    app.put('/api/attachment/announcement/:id', updateAnnouncementAttachmentByID);

    app.put('/api/attachment/content/:id', updateAnnouncementAttachmentByID);
    
    app.delete('/api/attachment/:id',deleteAttachmentByID);

    app.delete('/api/attachment/announcement/:id', deleteAnnouncementAttachmentByID); 

    app.delete('/api/attachment/assignment/:id', deleteAssignmentAttachmentByID); 

    app.delete('/api/attachment/content/:id', deleteContentAttachmentByID); 

}