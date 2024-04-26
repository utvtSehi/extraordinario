const express = require('express');
const router = express.Router();
const { getUserById, deleteUserById, updateUserById, createUser, login } = require('../controllers/userControllers');

router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);
router.post('/login', login);
module.exports = router;