const express = require('express');
const bodyParser = require('body-parser');
const { conn, sql } = require('../connect');
const cors = require('cors'); 

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());

//get all student
const getAllUsers = async (req, res) => {
    try {
        const pool = await conn;
        const result = await pool.request().query('SELECT * FROM [User]');
        res.json(result.recordset);
        console.log(result.recordset);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

//get base on id
const getUserByID = async (req, res) => {
    try {
        const pool = await conn;
        const { id } = req.params; // The parameter is named id, not UserID
        const result = await pool
            .request()
            .input('id', id) // Use the id variable here
            .query('SELECT * FROM [User] WHERE UserID = @id'); // Modify the query to reference the [User] table

        if (result.recordset.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(result.recordset[0]);
            console.log('Fetched completely.');
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const createUser = async (req, res) => {
    var pool = await conn;
    var sqlString = "INSERT INTO [User](UserID, UserFirstName, UserLastName, UserEmail, UserDOB, LoginID, RoleID) VALUES(@UserID, @UserFirstName, @UserLastName, @UserEmail, @UserDOB, @LoginID, @RoleID)"
    
    return await pool.request()
    .input('UserID', sql.NVarChar(25), req.body.UserID)
    .input('UserFirstName', sql.NVarChar(25), req.body.UserFirstName)
    .input('UserLastName', sql.NVarChar(25), req.body.UserLastName)
    .input('UserEmail', sql.NVarChar(25), req.body.UserEmail)
    .input('UserDOB', sql.Date, req.body.UserDOB)
    .input('LoginID', sql.NVarChar(25), req.body.LoginID)
    .input('RoleID', sql.NVarChar(25), req.body.RoleID)

    .query(sqlString, function(err, data){
        res.send({result: data});
        console.log(err);
    })
}

const updateUser = async (req, res) => {
    var pool = await conn;
    var sqlString = "UPDATE [User] SET UserFirstName = @UserFirstName, UserLastName = @UserLastName, UserEmail = @UserEmail, UserDOB = @UserDOB) WHERE UserID = @UserID"
    
    return await pool.request()
    .input('UserFirstName', sql.NVarChar(25), req.body.UserFirstName)
    .input('UserLastName', sql.NVarChar(25), req.body.UserLastName)
    .input('UserEmail', sql.NVarChar(25), req.body.UserEmail)
    .input('UserDOB', sql.Date, req.body.UserDOB)

    .query(sqlString, function(err, data){
        res.send({result: data});
        console.log(err);
    })
}

const deleteUserByID = async (req, res) => {
    try {
        const pool = await conn;
        const { id } = req.params; // The parameter is named id, not UserID
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
};

module.exports = { getAllUsers, getUserByID, createUser, updateUser, deleteUserByID };

