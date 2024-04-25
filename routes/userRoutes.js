const express = require('express');
const router = express.Router();
const { getUserById, deleteUserById, updateUserById, createUser } = require('../controllers/userControllers');

router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);

module.exports = router;