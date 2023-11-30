const { sql } = require('../connect'); // Import your connection file

const getAllRoles = async (req, res) => {
  try {
    const pool = await sql.conn;
    const result = await pool.request().query('SELECT * FROM Role');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching all roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const pool = await sql.conn;
    const { id } = req.params;
    const result = await pool
      .request()
      .input('id', sql.sql.Int, id)
      .query('SELECT * FROM Role WHERE RoleID = @id');

    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Role not found' });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error('Error fetching role by ID:', error);
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

module.exports = { getAllRoles, getRoleById };
