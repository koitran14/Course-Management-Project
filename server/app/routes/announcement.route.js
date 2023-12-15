const { getAllAnnouncement, getAnnouncementByID,getAnnouncementByUserID,getAllAnnouncementsByCourseID, createAnnouncement, updateAnnouncement, deleteAnnouncementByID } = require("../controllers/announcement");

module.exports = function(app){
    app.get('/api/announcement', getAllAnnouncement);

    app.get('/api/announcement/:id', getAnnouncementByID);

    app.get('/api/:id/announcement/', getAllAnnouncementsByCourseID);

    app.get('/api/user/:id/announcement/', getAnnouncementByUserID);

    app.post('/api/announcement', createAnnouncement);

    app.put('/api/announcement/:id', updateAnnouncement);
    
    app.delete('/api/announcement/:id', deleteAnnouncementByID)

}