const { conn, sql } = require('../../connect');

module.exports = class Assignment {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Assignment';
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
        var sqlString = "SELECT * from Assignment Where A_ID = @varID";
        
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

    async getNearByUserID(id, result) {
        var pool = await conn;
        var sqlString = `
        SELECT *
        FROM (
            SELECT 
                Assignment.*,
                CONVERT(VARCHAR, A_DueDate, 103) AS FormattedDueDate,
                DATEDIFF(DAY, GETDATE(), A_DueDate) AS DaysLeft
            FROM 
                Assignment
            JOIN 
                Course ON Assignment.CourseID = Course.CourseID
            JOIN 
                Enroll ON Course.CourseID = Enroll.CourseID
            JOIN 
                [User] ON Enroll.UserID = [User].UserID
            WHERE 
                [User].UserID = @varID
                AND DATEDIFF(DAY, GETDATE(), A_DueDate) > 0
                AND DATEDIFF(DAY, GETDATE(), A_DueDate) < 4
        ) AS AssignmentWithDates
        ORDER BY 
            A_DueDate ASC;
    `;
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getNearByCourseID(id, result) {
        var pool = await conn;
        var sqlString = `
            SELECT
            Assignment.*,
            CONVERT(VARCHAR, A_DueDate, 103) AS FormattedDueDate,
            DATEDIFF(DAY, GETDATE(), A_DueDate) AS DaysLeft
        FROM 
            Assignment
        WHERE 
            Assignment.CourseID = @varID
            AND DATEDIFF(DAY, GETDATE(), A_DueDate) < 4
            AND 
            DATEDIFF(DAY, GETDATE(), A_DueDate) > 0
        ORDER BY 
            A_DueDate ASC;
        `;
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getAllByUserID(id, result) {
        var pool = await conn;
        var sqlString = `
        SELECT DISTINCT Assign.*
        FROM 
            Assignment Assign
        JOIN 
            Course ON Assign.CourseID = Course.CourseID
        JOIN 
            Enroll ON Course.CourseID = Enroll.CourseID
        JOIN 
            [User] ON Enroll.UserID = [User].UserID
        WHERE 
            [User].UserID = @varID
            AND DATEDIFF(DAY, GETDATE(), Assign.A_DueDate) > 0;        
        `;
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }


   async getAllByCourseID(id, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Assignment WHERE CourseID = @varID AND DATEDIFF(DAY, GETDATE(), A_DueDate) > 0;";
        return await pool.request()
        .input('varID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async create(newData, result) {
        var pool = await conn;
        var sqlString = "INSERT INTO Assignment(A_ID, A_Title, A_Desc, A_StartAt,A_DueDate, A_TextSubmission, A_Comment,CourseID) VALUES(@A_ID, @A_Title, @A_Desc, @A_StartAt,@A_DueDate, @A_TextSubmission, @A_Comment,@CourseID)"
    
        return await pool.request()
            .input('A_ID', sql.NVarChar(25), newData.A_ID)
            .input('A_Title', sql.NVarChar(50), newData.A_Title)
            .input('A_Desc', sql.NVarChar(150), newData.A_Desc)
            .input('A_StartAt', sql.Date, newData.A_StartAt)
            .input('A_DueDate', sql.Date, newData.A_DueDate)
            .input('CourseID', sql.NVarChar(25), newData.CourseID)

        .query(sqlString, function(err, data) {
            if (err) {
                result(true, null)
            } else {
                result( null, data)
            }
        })
    }

    async update(newData, result) {
        var pool = await conn;
        var sqlString = "UPDATE Assignment SET A_Title = @A_Title, A_Desc = @A_Desc, A_StartAt = @A_StartAt, A_DueDate= @A_DueDate WHERE A_ID = @A_ID"
        
        return await pool.request()
        .input('A_Title', sql.NVarChar(50), newData.A_Title)
        .input('A_Desc', sql.NVarChar(150), newData.A_Desc)
        .input('A_StartAt', sql.Date, newData.A_StartAt)
        .input('A_DueDate', sql.Date, newData.A_DueDate)
        .query(sqlString, function(err, data){
            if (err) {
                result(true, null)
            } else {
                result(null, newData)
            }
        })
    }

    async delete(id, result) {
        var pool = await conn;
        var sqlString = "DELETE FROM Assignment WHERE A_ID = @id"
        return await pool.request()
        .input('id', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (err){
                result(true, null);
            } else {
                result(null, data);
            }
        })
    }
}

