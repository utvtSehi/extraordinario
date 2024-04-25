const Carrito = require('../models/cartsModel');
const Producto = require('../models/productsModel');

exports.getCarritoByUserId = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ usuario: req.params.id }).populate('productos');
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        return res.status(200).json(carrito);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addProductToCarrito = async (req, res) => {
    try {
        const userId = req.params.id;
        const productId = req.body.productoId;
        const cantidad = req.body.cantidad || 1;
        let carrito = await Carrito.findOne({ usuario: userId });
        if (!carrito) {
            carrito = new Carrito({ usuario: userId, productos: [] });
            await carrito.save();
        }

        const producto = await Producto.findById(productId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (producto.stock < cantidad) {
            return res.status(400).json({ message: 'Cantidad solicitada excede el stock disponible' });
        }

        if (carrito.productos.includes(productId)) {
            return res.status(400).json({ message: 'El producto ya está en el carrito' });
        }

        for (let i = 0; i < cantidad; i++) {
            carrito.productos.push(productId);
        }
        await carrito.save();

        producto.stock -= cantidad;
        producto.contadorCarrito += cantidad;
        await producto.save();

        const precioTotal = carrito.productos.length * producto.precio;

        return res.status(200).json({ message: 'Producto(s) agregado(s) al carrito correctamente'+ carrito, preciototal: precioTotal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



exports.removeProductFromCarrito = async (req, res) => {
    try {
        const userId = req.params.id;
        const productId = req.body.productoId;
        const cantidad = req.body.cantidad || 1; 

        const carrito = await Carrito.findOne({ usuario: userId });
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado para este usuario' });
        }

        const index = carrito.productos.indexOf(productId);
        if (index === -1) {
            return res.status(400).json({ message: 'El producto no está en el carrito' });
        }

        for (let i = 0; i < cantidad; i++) {
            carrito.productos.splice(index, 1);
        }
        await carrito.save();

        const producto = await Producto.findById(productId);
        if (producto) {
            producto.stock += cantidad;
            producto.contadorCarrito -= cantidad;
            await producto.save();
        }

        return res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.clearCarrito = async (req, res) => {
    try {
        const userId = req.params.id;

        const carrito = await Carrito.findOne({ usuario: userId });
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado para este usuario' });
        }

        const cantidadPorProducto = {};

        for (const productId of carrito.productos) {
            if (!cantidadPorProducto[productId]) {
                cantidadPorProducto[productId] = 0;
            }
            cantidadPorProducto[productId]++;
        }

        for (const productId in cantidadPorProducto) {
            const cantidad = cantidadPorProducto[productId];
            const producto = await Producto.findById(productId);
            if (producto) {
                producto.stock += cantidad;
                producto.contadorCarrito -= cantidad;
                await producto.save();
            }
        }
        carrito.productos = [];
        await carrito.save();
        return res.status(200).json({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




