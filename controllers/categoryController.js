const db = require('../config/db');


const getCategories = (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving categories');
    }
    res.json(results);
  });
};


const createCategory = (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required.' });
  }

  const query = 'INSERT INTO category (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      return res.status(500).send('Error creating category');
    }
    res.status(201).send('Category created');
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
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

  const query = 'DELETE FROM category WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting category');
    }
    res.send('Category deleted');
  });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
