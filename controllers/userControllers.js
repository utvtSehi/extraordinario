const express = require('express');
const Carrito = require('../models/cartsModel');
const User = require('../models/usersModel');
const router = express.Router();
router.use(express.json());

exports.createUser = async (req, res) => {
    try {
        const { correo, password, nombre, apellidos, genero } = req.body;
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const NuevoUsuario = new User({ correo, password, nombre, apellidos, genero });
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
