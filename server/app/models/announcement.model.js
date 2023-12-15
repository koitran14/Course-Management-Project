const { conn, sql } = require('../../connect');

module.exports = class Announcement {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Announcement';
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
        var sqlString = "Select * from Announcement Where AnID = @varID";
        
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

    async getAllByUserID(id, result) {
        var pool = await conn;
        var sqlString = `
        SELECT A.*
        FROM Announcement A
        JOIN Enroll E ON A.CourseID = E.CourseID
        WHERE E.UserID = @varID;  
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
        var sqlString = "Select * from Announcement Where CourseID = @varID;"
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
        var sqlString = "INSERT INTO Announcement(AnID, AnTitle, AnDesc, AnDate, CourseID) VALUES(@AnID, @AnTitle, @AnDesc, @AnDate, @CourseID)"
    
        return await pool.request()
            .input('AnID', sql.NVarChar(25), newData.AnID)
            .input('AnTitle', sql.NVarChar(50), newData.AnTitle)
            .input('AnDesc', sql.NVarChar(150), newData.AnDesc)
            .input('AnDate', sql.Date, newData.AnDate)
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
        var sqlString = "UPDATE Announcement SET AnTitle = @AnTitle, AnDesc = @AnDesc, AnDate = @AnDate WHERE AnID = @AnID"
        
        return await pool.request()
        .input('AnTitle', sql.NVarChar(25), newData.AnTitle)
        .input('AnDesc', sql.NVarChar(25), newData.AnDesc)
        .input('AnDate', sql.Date, newData.AnDate)
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
        var sqlString = "DELETE FROM Announcement WHERE AnID = @id"
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

