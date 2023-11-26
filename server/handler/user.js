const express = require('express');
const bodyParser = require('body-parser');
const { conn } = require('../server');
const cors = require('cors'); 

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());

//get all student
app.get('/api/user', async function (req, res) {
    try {
        const pool = await conn;
        const result = await pool.request().query('SELECT * FROM [User]');
        res.json(result.recordset);
        console.log(result.recordset);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

//get base on id
app.get('/api/user/:id', async function (req, res) {
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
});

app.listen(PORT, function () {
    console.log(`Server is running at client site: http://localhost:${PORT}`);
});
