const db = require('../config/db');


const createUser = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'First name, last name, email en password zijn verplicht.' });
  }

  const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error creating user');
    }
    res.status(201).send('User created');
  });
};


const getUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
};


const updateUser = (req, res) => {
    const { id } = req.params;  
    const { first_name, last_name, email, password } = req.body;
  
 
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'First name, last name, email en password zijn verplicht.' });
    }
  
    
    const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [first_name, last_name, email, password, id], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);  
        return res.status(500).send('Error updating user');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('User not found');  
      }
      res.send('User updated');
    });
  };


const deleteUser = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Error deleting user');
    }
    res.send('User deleted');
  });
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
