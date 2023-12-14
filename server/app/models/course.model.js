const { conn, sql } = require('../../connect');

module.exports = class Course {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Course';
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
        var sqlString = "Select * from Course Where CourseID = @varID";
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

    async getAllByTeacherID(id, result) {
        var pool = await conn;
        var sqlString = "SELECT Course.* FROM Course WHERE Course.UserID = @UserID;"
        return await pool.request()
        .input('UserID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getAllByStudentID(id, result) {
        var pool = await conn;
        var sqlString = "SELECT Course.* FROM Course INNER JOIN Enroll ON Course.CourseID = Enroll.CourseID WHERE Enroll.UserID = @UserID;"
        return await pool.request()
        .input('UserID', sql.NVarChar(25), id)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async create(newData, result) {
        try {
            var pool = await conn;
            var sqlString = "INSERT INTO Course (CourseID, CourseName, TutorID) VALUES (@CourseID, @CourseName, @TutorID)";
    
            const request = pool.request();
            request.input('CourseID', sql.NVarChar(25), newData.CourseID);
            request.input('CourseName', sql.NVarChar(25), newData.CourseName);
            request.input('TutorID', sql.NVarChar(150), newData.TutorID);
    
            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }
    

    async update(newData, result) {
            var pool = await conn;
            var sqlString = "UPDATE Course SET CourseName = @CourseName, TutorID = @TutorID) WHERE CourseID = @CourseID"
            
            return await pool.request()
            .input('RoleID', sql.NVarChar(25), newData.RoleID)
            .input('RoleName', sql.NVarChar(25), newData.RoleName)
            .input('RoleDescription', sql.NVarChar(150), newData.RoleDescription)
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
            var sqlString = "Delete from Course where CourseID = @id";
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

