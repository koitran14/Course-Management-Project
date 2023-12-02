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

    async create(newData, result) {
        var pool = await conn;
        var sqlString = "INSERT INTO [User](UserID, UserFirstName, UserLastName, UserEmail, UserDOB, LoginID, RoleID) VALUES(@UserID, @UserFirstName, @UserLastName, @UserEmail, @UserDOB, @LoginID, @RoleID)"
    
        return await pool.request()
        .input('UserID', sql.NVarChar(25), newData.UserID)
        .input('UserFirstName', sql.NVarChar(25), newData.UserFirstName)
        .input('UserLastName', sql.NVarChar(25), newData.UserLastName)
        .input('UserEmail', sql.NVarChar(25), newData.UserEmail)
        .input('UserDOB', sql.Date, newData.UserDOB)
        .input('LoginID', sql.NVarChar(25), newData.LoginID)
        .input('RoleID', sql.NVarChar(25), newData.RoleID)
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
        var sqlString = "UPDATE [User] SET UserFirstName = @UserFirstName, UserLastName = @UserLastName, UserEmail = @UserEmail, UserDOB = @UserDOB) WHERE UserID = @UserID"
        
        return await pool.request()
        .input('UserFirstName', sql.NVarChar(25), newData.UserFirstName)
        .input('UserLastName', sql.NVarChar(25), newData.UserLastName)
        .input('UserEmail', sql.NVarChar(25), newData.UserEmail)
        .input('UserDOB', sql.Date, newData.UserDOB)
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

