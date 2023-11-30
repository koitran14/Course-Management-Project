const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllRoles, getRoleById } = require('./handler/role'); // Import your handlers
const { getAllUsers, getUserByID, createUser, updateUser } = require('./handler/user');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/api/role', getAllRoles);
app.get('/api/role/:id', getRoleById);

app.get('/api/user', getAllUsers);
app.get('/api/user/:id', getUserByID);
app.post('/api/user', createUser);
app.put('/api/user', updateUser);

app.listen(PORT, () => {
  console.log(`Server is running at client site: http://localhost:${PORT}`);
});
