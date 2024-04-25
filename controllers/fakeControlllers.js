const Product = require('../models/productsModel');
const User = require('../models/usersModel');
const Carrito = require('../models/cartsModel');
const faker = require('faker');

exports.generarUsuarios = async (req, res) => {
    try {

            const usuarios = [];
            for (let i = 0; i < 50; i++) {
                const fakeUser = new User({
                    correo: faker.internet.email(),
                    password: faker.internet.password(),
                    nombre: faker.name.firstName(),
                    apellidos: faker.name.lastName(),
                    genero: faker.random.arrayElement(['Masculino', 'Femenino', 'Otros']),
                });
                const NuevoUsuario = await fakeUser.save();

                try {
                    const nuevoCarrito = new Carrito({ usuario: NuevoUsuario._id, productos: [] });
                    await nuevoCarrito.save();
                } catch (error) {
                    console.error('Error al agregar carrito:', error);
                    await User.findByIdAndDelete(NuevoUsuario._id);
                    continue; 
                }

                usuarios.push(fakeUser);
            }

            res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar datos falsos de usuarios' });
    }
};


exports.generarProductos = async (req, res) => {
    try {
            const productos = [];
            for (let i = 0; i < 50; i++) {
                const fakeProduct = new Product({
                    nombre: faker.commerce.productName(),
                    descripcion: faker.lorem.sentence(),
                    precio: faker.commerce.price(),
                    stock: faker.datatype.number(),
                });
                await fakeProduct.save();
                productos.push(fakeProduct);
            }

            res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar datos falsos de productos' });
    }
};