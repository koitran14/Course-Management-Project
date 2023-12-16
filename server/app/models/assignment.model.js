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
        var sqlString = "Select * from Assignment Where A_ID = @varID";
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

    async getByCourseID(id, result) {
        var pool = await conn;
        var sqlString = "Select * from Assignment Where CourseID = @varID";
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

    async create(newData, result) {
        try {
            var pool = await conn;
            var sqlString = "INSERT INTO Assignment (A_ID, A_Title, A_Desc, A_StartAt, A_DueDate, CourseID) VALUES (@A_ID, @A_Title, @A_Desc, @A_StartAt, @A_DueDate, @CourseID)";
    
            const request = pool.request();
            request.input('A_ID', sql.NVarChar(25), newData.A_ID);
            request.input('A_Title', sql.NVarChar(25), newData.A_Title);
            request.input('A_Desc', sql.NVarChar(150), newData.A_Desc);
            request.input('A_StartAt', sql.Date, newData.A_StartAt);
            request.input('A_DueDate', sql.Date, newData.A_DueDate);
            request.input('CourseID', sql.NVarChar(150), newData.CourseID);

            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }
    

    async update(newData, result) {
            var pool = await conn;
            var sqlString = "UPDATE Assignment SET A_Title = @A_Title, A_Desc = @A_Desc, A_StartAt = @A_StartAt, A_DueDate = @A_DueDate, CourseID = @CourseID) WHERE A_ID = @A_ID"
            
            return await pool.request()
            .input('A_ID', sql.NVarChar(25), newData.A_ID)
            .input('A_Title', sql.NVarChar(25), newData.A_Title)
            .input('A_Desc', sql.NVarChar(150), newData.A_Desc)
            .input('A_StartAt', sql.Date, newData.A_StartAt)
            .input('A_DueDate', sql.Date, newData.A_DueDate)
            .input('CourseID', sql.NVarChar(25), newData.CourseID)
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
            var sqlString = "Delete from Assignment where A_ID = @id";
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

