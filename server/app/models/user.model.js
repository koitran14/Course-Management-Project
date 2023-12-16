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
        var sqlString = "Select * from [User] Where UserName = @name";
        
        return await pool.request()
        .input('name', sql.NVarChar(25), username)
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


    async update(id, newData, result) {
        var pool = await conn;
        var sqlString = "UPDATE [User] SET ";
        var updateColumns = [];
    
        // Generate update statements for each field
        if (newData.UserName !== undefined && newData.UserName !== null) updateColumns.push("UserName = @UserName");
        if (newData.UserPass !== undefined && newData.UserPass !== null) updateColumns.push("UserPass = @UserPass");
        if (newData.UserFirstName !== undefined && newData.UserFirstName !== null) updateColumns.push("UserFirstName = @UserFirstName");
        if (newData.UserLastName !== undefined && newData.UserLastName !== null) updateColumns.push("UserLastName = @UserLastName");
        if (newData.UserEmail !== undefined && newData.UserEmail !== null) updateColumns.push("UserEmail = @UserEmail");
        if (newData.UserDOB !== undefined && newData.UserDOB !== null) updateColumns.push("UserDOB = @UserDOB");
        if (newData.UserUniID !== undefined && newData.UserUniID !== null) updateColumns.push("UserUniID = @UserUniID");
        if (newData.DeptID !== undefined && newData.DeptID !== null) updateColumns.push("DeptID = @DeptID");
    
        // If no fields are specified for update, return null
        if (updateColumns.length === 0) {
            result(null, null);
            return;
        }
    
        sqlString += updateColumns.join(", ");
        sqlString += " WHERE UserID = @UserID";
    
        // Create a single request and execute the update
        const request = pool.request();
    
        // Set input parameters for each field
        for (const column of updateColumns) {
            request.input(column.split('=')[0].trim(), newData[column.split('=')[0].trim()] || undefined);
        }
    
        // Set the common UserID parameter
        request.input('UserID', sql.NVarChar(25), id);
    
        // Execute the update
        await request.query(sqlString);
    
        result(null, newData);
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

