const { conn, sql } = require('../../connect');

module.exports = class User {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from [User]';
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
        var sqlString = "Select * from [User] Where UserID = @varID";
        
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

    async getByUserName(username, result) {
        var pool = await conn;
        var sqlString = "Select * from [User] Where UserName = @varUserName";
        
        return await pool.request()
        .input('varUserName', sql.NVarChar(25), username)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset[0]);
            } else {
                result (true, null);
            }
        })
    }

    async create(newData, result) {
        var pool = await conn;
        var sqlString = "INSERT INTO [User](UserID, UserName, UserPass, UserFirstName, UserLastName, UserEmail, UserDOB, UserUniID, RoleID, DeptID) VALUES(@UserID, @UserName, @UserPass, @UserFirstName, @UserLastName, @UserEmail, @UserDOB, @UserUniID, @RoleID, @DeptID)"
    
        return await pool.request()
        .input('UserID', sql.NVarChar(25), newData.UserID)
        .input('UserName', sql.NVarChar(25), newData.UserName)
        .input('UserPass', sql.NVarChar(25), newData.UserPass)
        .input('UserFirstName', sql.NVarChar(25), newData.UserFirstName)
        .input('UserLastName', sql.NVarChar(25), newData.UserLastName)
        .input('UserEmail', sql.NVarChar(25), newData.UserEmail)
        .input('UserDOB', sql.Date, newData.UserDOB)
        .input('UserUniID', sql.NVarChar(25), newData.UserUniID)
        .input('RoleID', sql.NVarChar(25), newData.RoleID)
        .input('DeptID', sql.NVarChar(25), newData.DeptID)
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
        var sqlString = "UPDATE [User] SET UserName = @UserName, UserPass = @UserPass, UserFirstName = @UserFirstName, UserLastName = @UserLastName, UserEmail = @UserEmail, UserDOB = @UserDOB, UserUniID = @UserUniID, DeptID = @DeptID) WHERE UserID = @UserID"
        
        return await pool.request()
        .input('UserName', sql.NVarChar(25), newData.UserName)
        .input('UserPass', sql.NVarChar(25), newData.UserPass)
        .input('UserFirstName', sql.NVarChar(25), newData.UserFirstName)
        .input('UserLastName', sql.NVarChar(25), newData.UserLastName)
        .input('UserEmail', sql.NVarChar(25), newData.UserEmail)
        .input('UserDOB', sql.Date, newData.UserDOB)
        .input('UserUniID', sql.NVarChar(25), newData.UserUniID)
        .input('DeptID', sql.NVarChar(25), newData.DeptID)
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
        var sqlString = "Delete from [User] where UserID = @id";
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

