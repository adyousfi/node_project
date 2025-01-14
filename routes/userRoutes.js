const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.get('/users/:id', userController.getUserById);
router.get('/users/search', userController.searchUsers);  

module.exports = router;
