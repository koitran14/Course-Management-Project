const { conn, sql } = require('../../connect');

module.exports = class Role {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Role';
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
        var sqlString = "Select * from Role Where RoleID = @varID";
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
            var sqlString = "INSERT INTO Role (RoleID, RoleName, RoleDescription) VALUES(@RoleID, @RoleName, @RoleDescription)"
        
            return await pool.request()
            .input('RoleID', sql.NVarChar(25), newData.RoleID)
            .input('RoleName', sql.NVarChar(25), newData.RoleName)
            .input('RoleDescription', sql.NVarChar(150), newData.RoleDescription)
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
            var sqlString = "UPDATE Role SET RoleName = @RoleName, RoleDescription = @RoleDescription) WHERE RoleID = @RoleID"
            
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
            var sqlString = "Delete from Role where RoleID = @id";
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

