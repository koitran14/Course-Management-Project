const { conn, sql } = require('../../connect');

module.exports = class Submission {
    async getAll(result){
        var pool = await conn;
        var sqlString = `Select * from AssignmentSubmission`;
        return await pool.request()
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result(true, null)
            }
        })
    }

    async getAllByA_ID(id, result){
        var pool = await conn;
        var sqlString = `
        SELECT *
        FROM DoAssignment
        WHERE DoAssignment.A_ID = @varID
        `;
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result(true, null)
            }
        })
    }

    async getAllByUserID(id, result){
        var pool = await conn;
        var sqlString = `
        SELECT *
        FROM AssignmentSubmission
        WHERE DoAssignmentID IN (
            SELECT DoAssignmentID
            FROM DoAssignment
            WHERE UserID = @varID 
        );
        `;
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result(true, null)
            }
        })
    }

    async getSubmissionOfUserIDByA_ID(UserID, A_ID) {
        try {
            const pool = await conn;
    
            const sqlString1 = `
                SELECT Attachment.AttachID, Attachment.Attach_FileName, Attachment.Attach_Date, Attachment.Attach_URL
                FROM Attachment
                JOIN AssignmentSubmission ON AssignmentSubmission.AttachID = Attachment.AttachID
                JOIN DoAssignment ON DoAssignment.DoAssignmentID = AssignmentSubmission.DoAssignmentID
                WHERE DoAssignment.A_ID = @varA_ID 
                AND DoAssignment.UserID = @varUserID      
            `;
    
            const sqlString2 = `
                SELECT 
                DoAssignment.DoAssignmentID,
                DoAssignment.A_ID,
                DoAssignment.UserID,
                DoAssignment.Grade,
                DoAssignment.DoAt
                FROM Attachment
                JOIN AssignmentSubmission ON AssignmentSubmission.AttachID = Attachment.AttachID
                JOIN DoAssignment ON DoAssignment.DoAssignmentID = AssignmentSubmission.DoAssignmentID
                WHERE DoAssignment.A_ID = @varA_ID
                AND DoAssignment.UserID = @varUserID
            `;
            
            const submissionInfoResult = await pool.request()
                .input('varA_ID', sql.NVarChar(25), A_ID)
                .input('varUserID', sql.NVarChar(25), UserID)
                .query(sqlString2);
    
            const attachmentsResult = await pool.request()
                .input('varA_ID', sql.NVarChar(25), A_ID)
                .input('varUserID', sql.NVarChar(25), UserID)
                .query(sqlString1);
    
            const submissionInfo = submissionInfoResult.recordset[0];
            const attachments = attachmentsResult.recordset;
    
            return { submissionInfo, attachments };
        } catch (error) {
            throw new Error(`Error in getSubmissionOfUserIDByA_ID: ${error.message}`);
        }
    }
    

    async create(newData, result) {
        try {
            var pool = await conn;
            var sqlString = `
            DECLARE @NewDoAssignmentID UNIQUEIDENTIFIER = NEWID(); 
            
            INSERT INTO DoAssignment (DoAssignmentID, A_ID, UserID, Grade, DoAt)
            VALUES (@NewDoAssignmentID, @varA_ID, @varUserID, -1.0, GETDATE()); 
            `;
    
            newData.attachments.forEach(async (attachment) => {
                sqlString += `
                INSERT INTO Attachment (AttachID, Attach_FileName, Attach_Date, Attach_URL, CourseID)
                VALUES ('${attachment.AttachID}', '${attachment.Attach_FileName}', '${attachment.Attach_Date}', '${attachment.Attach_URL}', '${attachment.CourseID}');
    
                INSERT INTO AssignmentSubmission (A_SubID, AttachID, DoAssignmentID)
                VALUES (NEWID(), '${attachment.AttachID}', @NewDoAssignmentID);
                `;
            });
    
            const request = pool.request()
                .input('varA_ID', sql.NVarChar(25), newData.A_ID)
                .input('varUserID', sql.NVarChar(25), newData.UserID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }
    

    async delete(UserID, A_ID, result) {
        var pool = await conn;
        var sqlString = `
        DECLARE @UserID VARCHAR(25) = @varUserID; 
        DECLARE @AssignmentID VARCHAR(25) = @varA_ID;

        DECLARE @DoAssignmentID UNIQUEIDENTIFIER;
        SELECT @DoAssignmentID = DoAssignmentID
        FROM DoAssignment
        WHERE A_ID = @AssignmentID AND UserID = @UserID;

        DELETE FROM AssignmentSubmission
        WHERE DoAssignmentID = @DoAssignmentID;

        DELETE FROM AssignmentAttachment
        WHERE A_ID = @AssignmentID;

        DELETE FROM DoAssignment
        WHERE DoAssignmentID = @DoAssignmentID;
        `
        return await pool.request()
        .input('@varUserID', sql.NVarChar(25), UserID)
        .input('@varA_ID', sql.NVarChar(25), A_ID)
        .query(sqlString, function(err, data){
            if (err){
                result(true, null);
            } else {
                result(null, data);
            }
        })
    }
}