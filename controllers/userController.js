const db = require('../config/db');


const getUserById = (req, res) => {
  const { id } = req.params;  


  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving user');
    }
    if (result.length === 0) {
      return res.status(404).send('User not found');
    }
   
    res.json(result[0]);
  });
};


const getUsers = (req, res) => {
  const limit = parseInt(req.query.limit,) || 1000;  
  const offset = parseInt(req.query.offset, 10) || 0;  

 
  if (isNaN(limit) || isNaN(offset)) {
    return res.status(400).send('Limit and offset must be numbers.');
  }

  const query = 'SELECT * FROM users LIMIT ? OFFSET ?';
  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
};


const createUser = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'First name, last name, email and password are required.' });
  }

  
  const nameRegex = /^[A-Za-z\s]+$/;  
  if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
    return res.status(400).send('First name and last name cannot contain numbers.');
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Please provide a valid email address.');
  }

  
  const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, password], (err, result) => {
    if (err) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).send('User created');
  });
};


const updateUser = (req, res) => {
  const { id } = req.params;

  
  if (isNaN(id)) {
    return res.status(400).send('ID must be a number.');
  }

  const { first_name, last_name, email, password } = req.body;

  
  const nameRegex = /^[A-Za-z\s]+$/;  
  if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
    return res.status(400).send('First name and last name cannot contain numbers.');
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Please provide a valid email address.');
  }

  const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [first_name, last_name, email, password, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating user');
    }
    res.status(200).send('User updated');
  });
};


const deleteUser = (req, res) => {
  const { id } = req.params;

  
  if (isNaN(id)) {
    return res.status(400).send('ID must be a number.');
  }

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.status(200).send('User deleted');
  });
};

const searchUsers = (req, res) => {
  const { search } = req.query;

  
  if (!search) {
    return res.status(400).json({ error: 'Search parameter is required' });
  }

  
  const query = `
    SELECT * FROM users 
    WHERE first_name LIKE ? 
      OR last_name LIKE ?
  `;

  
  const searchTerm = `%${search}%`;

  // Voer de query uit
  db.query(query, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      return res.status(500).json({ error: 'Error retrieving users' });
    }

    
    if (results.length === 0) {
      return res.status(404).json({ success: true, data: [], message: 'No users found' });
    }

    
    res.status(200).json({ success: true, data: results });
  });
};


  

    
module.exports = { getUsers, createUser, updateUser, deleteUser, getUserById, searchUsers };
