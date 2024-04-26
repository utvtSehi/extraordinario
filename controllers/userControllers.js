const express = require('express');
const jwt = require('jsonwebtoken');
const Carrito = require('../models/cartsModel');
const User = require('../models/usersModel');
const keys = require('../config/keys');
const router = express.Router();
router.use(express.json());

const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { correo, password, nombre, apellidos, genero } = req.body;
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const NuevoUsuario = new User({ correo, password: hashedPassword, nombre, apellidos, genero });
        await NuevoUsuario.save();

        try {
            const nuevoCarrito = new Carrito({ usuario: NuevoUsuario._id, productos: [] });
            await nuevoCarrito.save();
        } catch {
            await User.findByIdAndDelete(NuevoUsuario._id);
        }
        return res.status(201).json({ message: "Registrado exitosamente", datos: NuevoUsuario });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: "Actualizado exitosamente", datos: usuario });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await User.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const payload = {
            id: usuario._id,
            correo: usuario.correo
        };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: {
                    token: 'Bearer ' + token,
                    usuario: usuario,
                }
            });
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}
