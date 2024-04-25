const express = require('express');
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');

router.post('/', createProduct);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;