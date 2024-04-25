// models/Carrito.js
const { Schema, model } = require('mongoose');

const CarritoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }]
});

const Carrito = model('Carrito', CarritoSchema);

module.exports = Carrito;
