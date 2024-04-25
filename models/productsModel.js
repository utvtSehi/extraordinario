// models/Producto.js
const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    nombre: { type: String, required: false },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const Product = model('Product', ProductSchema);

module.exports = Product;
