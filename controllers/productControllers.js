const Producto = require('../models/productsModel');

const createProduct = async (req, res) => {
    // Implementación para crear un nuevo producto
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock,
        });
        return res.status(200).json({ message: 'Producto creado con éxito', producto: nuevoProducto });
    } catch (error) {
        return res.status(500).json({ error: 'Error al dar de alta el producto' });
    }
};


const deleteProduct = async (req, res) => {
    // Implementación para eliminar un producto
    try {
        await Producto.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

const updateProduct = async (req, res) => {
    // Implementación para actualizar un producto
    try {
        const { nombre, descripcion } = req.body;
        const UpdatedProduct = await Producto.findByIdAndUpdate(req.params.id, { nombre, descripcion });
        return res.status(200).json({ message: 'Producto actualizado con éxito', producto: UpdatedProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const getProduct = async (req, res) => {
    // Implementación para obtener un producto por ID
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto) {
            return res.status(200).json(producto);
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
};
