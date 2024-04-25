const express = require('express');
const router = express.Router();
const { getCarritoByUserId, addProductToCarrito, removeProductFromCarrito, clearCarrito } = require('../controllers/cartControllers');


router.get('/user/:id', getCarritoByUserId);
router.post('/user/:id/add', addProductToCarrito);
router.post('/user/:id/remove', removeProductFromCarrito);
router.post('/user/:id/clear', clearCarrito);

module.exports = router;
