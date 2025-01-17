const db = require('../config/db');


const getCategories = (req, res) => {
  const limit = parseInt(req.query.limit) || 1000;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || '';  

  
  const query = 'SELECT * FROM category WHERE name LIKE ? LIMIT ? OFFSET ?';
  db.query(query, [`%${search}%`, limit, offset], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving categories');
    }
    res.json(results);
  });
};


const getCategoryById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM category WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving category');
    }
    if (result.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.json(result[0]);
  });
};


const createCategory = (req, res) => {
  const { name, description } = req.body;

  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Category name is required.' });
  }

  if (!description || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required.' });
  }

  
  const query = 'INSERT INTO category (name, description) VALUES (?, ?)';
  db.query(query, [name.trim(), description.trim()], (err, result) => {
    if (err) {
      console.error('Error creating category:', err);
      return res.status(500).json({ error: 'Error creating category' });
    }
    res.status(201).json({ message: 'Category created' });
  });
};



const updateCategory = (req, res) => {
  const { id } = req.params;

 
  if (isNaN(id)) {
    return res.status(400).send('ID moet een nummer zijn.');
  }

  const { name, description } = req.body;

  const query = 'UPDATE category SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating category');
    }
    res.send('Category updated');
  });
};


const deleteCategory = (req, res) => {
  const { id } = req.params;

  
  if (isNaN(id)) {
    return res.status(400).send('ID moet een nummer zijn.');
  }

  
  const checkQuery = 'SELECT * FROM category WHERE id = ?';
  db.query(checkQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error checking category');
    }

    
    if (result.length === 0) {
      return res.status(404).send('Category not found');
    }

    
    const deleteQuery = 'DELETE FROM category WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send('Error deleting category');
      }
      res.send('Category deleted');
    });
  });
};



const searchCategories = (req, res) => {
  const search = req.query.search || '';  

  const query = 'SELECT * FROM category WHERE name LIKE ?';
  
  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving categories');
    }
    if (results.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.json(results);  
  });
};


module.exports = { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById, searchCategories };
