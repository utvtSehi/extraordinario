const express = require('express');
const router = express.Router();
router.use(express.json());

router.use('/users', require('./userRoutes'));
router.use('/products', require('./productsRoutes'));
router.use('/cart', require('./cartsRoutes'));
router.use('/docs', require('./swaggerRoutes'));
router.use('/faker', require('./fakerRoutes'));
module.exports = router;