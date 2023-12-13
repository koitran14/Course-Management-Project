const { conn, sql } = require('../../connect');

module.exports = class Login {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Login';
        return await pool.request()
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset);
            } else {
                result (true, null);
            }
        })
    }

    async getByUserName(username, result) {
        var pool = await conn;
        var sqlString = "Select * from Login Where LoginUserName = @UserName";
        
        return await pool.request()
        .input('UserName', sql.NVarChar(25), username)
        .query(sqlString, function(err, data){
            if (data.recordset.length > 0){
                result(null, data.recordset[0]);
            } else {
                result (true, null);
            }
        })
    }

    async getByID(id, result) {
        var pool = await conn;
        var sqlString = "Select * from Login Where LoginID = @LoginID";
        
        return await pool.request()
        .input('LoginID', sql.NVarChar(25), id)
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
        var sqlString = "INSERT INTO Login(LoginID,LoginUserName,LoginPassword) VALUES(@LoginID, @LoginUserName, @LoginPassword)"
    
        return await pool.request()
            .input('LoginID', sql.NVarChar(25), newData.LoginID)
            .input('LoginUserName', sql.NVarChar(25), newData.LoginUserName)
            .input('LoginPassword', sql.NVarChar(25), newData.LoginPassword)
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
        var sqlString = "UPDATE Login SET LoginUserName = @LoginUserName, LoginPassword = @LoginPassword WHERE LoginUserName = @LoginUserName"
        
        return await pool.request()
        .input('LogInUserName', sql.NVarChar(25), newData.LoginUserName)
        .input('LoginPassword', sql.NVarChar(25), newData.LoginPassword)
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
        var sqlString = "DELETE FROM Login WHERE LoginID = @id"
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

