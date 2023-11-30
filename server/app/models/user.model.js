const { conn, sql } = require('../../connect');

module.exports = class User {
    async getAll() {
        try {
            const pool = await conn;
            const sqlString = "SELECT * FROM User";
            const data = await pool.request().query(sqlString);
            
            if (data.recordset.length > 0) {
                console.log('Get all users completely.');
                data.recordset;
            } else {
                console.log('Empty User table');
                null;
            }
        } catch (error) {
            console.error('Error fetching all users:', error);
            res.status(500).json({ error: 'Failed to fetch all users' });
        }
    }

    async getByID(id) {
        try {
            const pool = await conn;
            var sqlString = 'SELECT * FROM [User] WHERE UserID = @id'
            const result = await pool.request()
                .input('id', id) // Use the id variable here
                .query(sqlString); // Modify the query to reference the [User] table
    
            if (result.recordset.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                console.log('Fetched completely.');
                res.json(result.recordset[0]);
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Failed to fetch user by ID' });
        }
    }

    async create(newData) {
        try {
            var pool = await conn;
            var sqlString = "INSERT INTO [User](UserID, UserFirstName, UserLastName, UserEmail, UserDOB, LoginID, RoleID) VALUES(@UserID, @UserFirstName, @UserLastName, @UserEmail, @UserDOB, @LoginID, @RoleID)"
        
            const result = await pool.request()
            .input('UserID', sql.NVarChar(25), newData.UserID)
            .input('UserFirstName', sql.NVarChar(25), newData.UserFirstName)
            .input('UserLastName', sql.NVarChar(25), newData.UserLastName)
            .input('UserEmail', sql.NVarChar(25), newData.UserEmail)
            .input('UserDOB', sql.Date, newData.UserDOB)
            .input('LoginID', sql.NVarChar(25), newData.LoginID)
            .input('RoleID', sql.NVarChar(25), newData.RoleID)
            .query(sqlString)

            res.status(201).send({ result })

        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Failed to create ID' });
        }
    }

    async update(newData) {
        try {
            var pool = await conn;
            var sqlString = "UPDATE [User] SET UserFirstName = @UserFirstName, UserLastName = @UserLastName, UserEmail = @UserEmail, UserDOB = @UserDOB) WHERE UserID = @UserID"
            
            const result = await pool.request()
            .input('UserFirstName', sql.NVarChar(25), newData.UserFirstName)
            .input('UserLastName', sql.NVarChar(25), newData.UserLastName)
            .input('UserEmail', sql.NVarChar(25), newData.UserEmail)
            .input('UserDOB', sql.Date, newData.UserDOB)
            .query(sqlString)
            
            res.status(201).send({ result })

        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Failed to update ID' });
        }
    }

    async delete(id) {
        try {
            const pool = await conn;
            const result = await pool
                .request()
                .input('id', sql.VarChar(25), id) // Use the id variable here
                .query('DELETE FROM [User] WHERE UserID = @id'); // Modify the query to reference the [User] table
    
            if (result.recordset.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(result.recordset[0]);
                console.log('Delete completely.');
            }
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}
