const express = require('express');
const router = express.Router();
const { generarProductos, generarUsuarios } = require('../controllers/fakeControlllers');


router.get('/user', generarUsuarios);
router.get('/products', generarProductos);

module.exports = router;
