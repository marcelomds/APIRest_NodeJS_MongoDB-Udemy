const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/config/config');

const indexRoute = require('./src/routes/index');
const usersRoute = require('./src/routes/users');

const app = express();


// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.bd_connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes Config
app.use('/', indexRoute);
app.use('/users', usersRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando...')
});