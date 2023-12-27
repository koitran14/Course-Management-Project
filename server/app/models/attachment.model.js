const { conn, sql } = require('../../connect');

module.exports = class Attachment {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Attachment';
        return await pool.request()
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getByID(id, result) {
        var pool = await conn;
        var sqlString = "Select * from Attachment Where AttachID = @varID";
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset[0]);
            } else {
                result (true, null);
            }
        })
    }

    async getByAnID(AnID, result) {
        var pool = await conn;
        var sqlString = `
            SELECT Attachment.*
            FROM Attachment
            INNER JOIN AnnouncementAttachment ON Attachment.AttachID = AnnouncementAttachment.AttachID
            WHERE AnnouncementAttachment.AnID = @varAnID;         
        `;
        return await pool.request()
        .input('varAnID', sql.NVarChar(25), AnID)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getByA_ID(A_ID, result) {
        var pool = await conn;
        var sqlString = `
        SELECT Attachment.*
        FROM Attachment
        INNER JOIN AssignmentAttachment ON Attachment.AttachID = AssignmentAttachment.AttachID
        WHERE AssignmentAttachment.A_ID = @varA_ID;         
    `;

        return await pool.request()
        .input('varA_ID', sql.NVarChar(25), A_ID)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getByConID(ConID, result) {
        var pool = await conn;
        var sqlString = `
            SELECT Attachment.*
            FROM Attachment
            JOIN ContentAttachment ON Attachment.AttachID = ContentAttachment.AttachID
            WHERE ContentAttachment.ConID = @varConID;        
        `;
        return await pool.request()
        .input('varConID', sql.NVarChar(25), ConID)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getBySubmissionID(UserID, A_ID, result) {
        var pool = await conn;
        var sqlString = `
            SELECT Attachment.*
            FROM Attachment
            INNER JOIN AssignmentSubmission ON Attachment.AttachID = AssignmentSubmission.AttachID
            INNER JOIN DoAssignment ON AssignmentSubmission.DoAssignmentID = DoAssignment.DoAssignmentID
            WHERE DoAssignment.UserID = @varUserID
            AND DoAssignment.A_ID = @varA_ID;
        `;
        return await pool.request()
        .input('varUserID', sql.NVarChar(25), UserID)
        .input('varA_ID', sql.NVarChar(25), A_ID)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async createAttachment(newData, result) {
        try {
            var pool = await conn;
            var sqlString = `            
            INSERT INTO Attachment (AttachID, Attach_FileName, Attach_Date, Attach_URL, CourseID)
            VALUES (@AttachID, @Attach_FileName, @Attach_Date, @Attach_URL, @CourseID);
            `;
    
            const request = pool.request()
            .input('AttachID', sql.NVarChar(25), newData.AttachID)
            .input('Attach_FileName', sql.NVarChar(100), newData.Attach_FileName)
            .input('Attach_Date', sql.DateTime, newData.Attach_Date)
            .input('Attach_URL', sql.NVarChar(150), newData.Attach_URL)
            .input('CourseID', sql.NVarChar(25), newData.CourseID)
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async createAnnouncementAttachment(newData, result) {
        try {
            var pool = await conn;
            var sqlString = `            
            INSERT INTO AnnouncementAttachment (AttachID, AnID)
            VALUES (@AttachID, @AnID);
            `;
    
            const request = pool.request()
            .input('AttachID', sql.NVarChar(25), newData.AttachID)
            .input('AnID', sql.NVarChar(25), newData.AnID)
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async createAssignmentAttachment(newData, result) {
        try {
            var pool = await conn;
            var sqlString = `            
            INSERT INTO AssignmentAttachment(AttachID, A_ID)
            VALUES (@AttachID, @A_ID);
            `;
    
            const request = pool.request()
            .input('AttachID', sql.NVarChar(25), newData.AttachID)
            .input('A_ID', sql.NVarChar(25), newData.A_ID)
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async createContentAttachment(newData, result) {
        try {
            var pool = await conn;
            var sqlString = `            
            INSERT INTO ContentAttachment(AttachID, ConID)
            VALUES (@AttachID, @ConID);
            `;
    
            const request = pool.request()
            .input('AttachID', sql.NVarChar(25), newData.AttachID)
            .input('ConID', sql.NVarChar(25), newData.ConID)
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async updateAnnouncementAttachment(attachmentID, newData, result) {
        try {
            var pool = await conn;
            var sqlString = `
                UPDATE Attachment
                SET Attach_FileName = @Attach_FileName,
                    Attach_Date = @Attach_Date,
                    Attach_URL = @Attach_URL,
                    CourseID = @CourseID
                WHERE AttachID = @AttachID;
    
                UPDATE AnnouncementAttachment
                SET AnID = @AnID
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID)
                .input('Attach_FileName', sql.NVarChar(100), newData.Attach_FileName)
                .input('Attach_Date', sql.DateTime, newData.Attach_Date)
                .input('Attach_URL', sql.NVarChar(150), newData.Attach_URL)
                .input('CourseID', sql.NVarChar(25), newData.CourseID)
                .input('AnID', sql.NVarChar(25), newData.AnID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async updateAssignmentAttachment(attachmentID, newData, result) {
        try {
            var pool = await conn;
            var sqlString = `
                UPDATE Attachment
                SET Attach_FileName = @Attach_FileName,
                    Attach_Date = @Attach_Date,
                    Attach_URL = @Attach_URL,
                    CourseID = @CourseID
                WHERE AttachID = @AttachID;
    
                UPDATE AssignmentAttachment
                SET A_ID = @A_ID
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID)
                .input('Attach_FileName', sql.NVarChar(100), newData.Attach_FileName)
                .input('Attach_Date', sql.DateTime, newData.Attach_Date)
                .input('Attach_URL', sql.NVarChar(150), newData.Attach_URL)
                .input('CourseID', sql.NVarChar(25), newData.CourseID)
                .input('A_ID', sql.NVarChar(25), newData.A_ID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async updateContentAttachment(attachmentID, newData, result) {
        try {
            var pool = await conn;
            var sqlString = `
                UPDATE Attachment
                SET Attach_FileName = @Attach_FileName,
                    Attach_Date = @Attach_Date,
                    Attach_URL = @Attach_URL,
                    CourseID = @CourseID
                WHERE AttachID = @AttachID;
    
                UPDATE ContentAttachment
                SET ConID = @ConID
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID)
                .input('Attach_FileName', sql.NVarChar(100), newData.Attach_FileName)
                .input('Attach_Date', sql.DateTime, newData.Attach_Date)
                .input('Attach_URL', sql.NVarChar(150), newData.Attach_URL)
                .input('CourseID', sql.NVarChar(25), newData.CourseID)
                .input('ConID', sql.NVarChar(25), newData.ConID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async deleteAnnouncementAttachment(attachmentID, result) {
        try {
            var pool = await conn;
            var sqlString = `
                DELETE FROM AnnouncementAttachment
                WHERE AttachID = @AttachID;
    
                DELETE FROM Attachment
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async deleteByID(attachmentID, result) {
        try {
            var pool = await conn;
            var sqlString = `
                DELETE FROM Attachment
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }

    async deleteAssignmentAttachment(attachmentID, result) {
        try {
            var pool = await conn;
            var sqlString = `
                DELETE FROM AssignmentAttachment
                WHERE AttachID = @AttachID;
    
                DELETE FROM Attachment
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }
    
    async deleteContentAttachment(attachmentID, result) {
        try {
            var pool = await conn;
            var sqlString = `
                DELETE FROM ContentAttachment
                WHERE AttachID = @AttachID;
    
                DELETE FROM Attachment
                WHERE AttachID = @AttachID;
            `;
    
            const request = pool.request()
                .input('AttachID', sql.NVarChar(25), attachmentID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }
}   

