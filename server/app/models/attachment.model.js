const { conn, sql } = require('../../connect');

module.exports = class Attachment {
    async getAll(result) {
        var pool = await conn;
        var sqlString = 'Select * from Attachment';
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
        var sqlString = "Select * from Attachment Where AttachID = @varID";
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
            var sqlString = "INSERT INTO Attachment (AttachID, Attach_FileName, Attach_FileType, Attach_Size, Attach_Date, Attach_URL, CourseID, A_ID, AnID, ConID) VALUES (@AttachID, @Attach_FileName, @Attach_FileType, @Attach_Size, @Attach_Date, @Attach_URL, @CourseID, @A_ID, @AnID, @ConID)";
    
            const request = pool.request();
            request.input('AttachID', sql.NVarChar(25), newData.AttachID);
            request.input('Attach_FileName', sql.NVarChar(25), newData.Attach_FileName);
            request.input('Attach_FileType', sql.NVarChar(150), newData.Attach_FileType);
            request.input('Attach_Size', sql.Float, newData.Attach_Size);
            request.input('Attach_Date', sql.Date, newData.Attach_Date);
            request.input('Attach_URL', sql.NVarChar(150), newData.Attach_URL);
            request.input('CourseID', sql.NVarChar(150), newData.CourseID);
            request.input('A_ID', sql.NVarChar(150), newData.A_ID);
            request.input('AnID', sql.NVarChar(150), newData.AnID);
            request.input('ConID', sql.NVarChar(150), newData.ConID);


            const data = await request.query(sqlString);
            result(null, data);
        } catch (error) {
            result(error, null);
        }
    }
    

    async update(newData, result) {
            var pool = await conn;
            var sqlString = "UPDATE Attachment SET (Attach_FileName = @Attach_FileName, Attach_FileType = @Attach_FileType, Attach_Size = @Attach_Size, Attach_Date = @Attach_Date, Attach_URL = @Attach_URL, CourseID = @CourseID, A_ID = @A_ID, AnID = @AnID, ConID = @ConID) WHERE AttachID = @AttachID"
            
            return await pool.request()
            .input('Attach_FileName', sql.NVarChar(25), newData.Attach_FileName)
            .input('Attach_FileType', sql.NVarChar(150), newData.Attach_FileType)
            .input('Attach_Size', sql.Float, newData.Attach_Size)
            .input('Attach_Date', sql.Date, newData.Attach_Date)
            .input('Attach_URL', sql.NVarChar(150), newData.Attach_URL)
            .input('CourseID', sql.NVarChar(150), newData.CourseID)
            .input('A_ID', sql.NVarChar(150), newData.A_ID)
            .input('AnID', sql.NVarChar(150), newData.AnID)
            .input('ConID', sql.NVarChar(150), newData.ConID)
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
            var sqlString = "Delete from Attachment where AttachID = @id";
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

