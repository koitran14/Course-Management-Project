const { conn, sql } = require('../../connect');

module.exports = class Content {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Content';
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
        var sqlString = "Select * from Content Where ConID = @varID";
        
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

    async getAllByCourseID(id, result) {
        var pool = await conn;
        var sqlString = `
            SELECT *, DATEDIFF(DAY, ConDate, GETDATE()) AS DayDifference
            FROM Content
            WHERE CourseID = @varID
            ORDER BY DayDifference ASC;        
        `
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
        var sqlString = "INSERT INTO Content(ConID, ConTitle, ConDesc, ConDate, CourseID) VALUES(@ConID, @ConTitle, @ConDesc, @ConDate, @CourseID)"
    
        return await pool.request()
            .input('ConID', sql.NVarChar(25), newData.ConID)
            .input('ConTitle', sql.NVarChar(50), newData.ConTitle)
            .input('ConDesc', sql.NVarChar(1000), newData.ConDesc)
            .input('ConDate', sql.DateTime, newData.ConDate)
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
        var sqlString = "UPDATE Content SET ConTitle = @ConTitle, ConDesc = @ConDesc, ConDate = @ConDate WHERE ContentID = @ContentID"
        
        return await pool.request()
        .input('ConTitle', sql.NVarChar(25), newData.Contitle)
        .input('ConDesc', sql.NVarChar(1000), newData.ConDesc)
        .input('ConDate', sql.DateTime, newData.ConDate)
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
        var sqlString = `
        DELETE FROM ContentAttachment WHERE ConID = @id;

        DELETE FROM Attachment WHERE AttachID IN (SELECT AttachID FROM ContentAttachment WHERE ConID = @id);

        DELETE FROM Content WHERE ConID = @id;

        `
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

