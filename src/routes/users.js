const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Funções Auxiliares (JWT)
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expired });
}

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});

        return res.json(users);
    } catch (err) {
        return res.status(400).json({error: 'Erro ao listar usuários'});
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({error: 'Dados Insuficientes'});

    try {
        if (await User.findOne({email: email}))
            return res.status(400).json({error: 'Esse email já está cadastrado'});

        const user = await User.create(req.body);
        if (!user)
            return res.status(400).json({error: 'Erro ao criar usuário'});

        user.password = undefined;
        return res.status(201).json({user, token: createUserToken(user.id)});
    } catch (err) {
        return res.status(500).json({error: 'Erro ao buscar usuário'});
    }
});

router.post('/auth', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password)
        return res.status(400).json({error: 'Dados insuficientes'});

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).json({error: 'Usuário não registrado'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok)
            return res.status(400).json({error: 'Erro ao autenticar usuário, senha incorreta!'});

        user.password = undefined;
        return  res.status(201).json({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.status(500).json({error: 'Erro ao buscar usuário'});
    }
});

module.exports = router;