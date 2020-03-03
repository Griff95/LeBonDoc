const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const Thing = require('./models/thing');

const jsonRoutes = require('./routes/json');
const userRoutes = require('./routes/user');
const adRoutes = require('./routes/ad');
const applicationRoutes = require('./routes/application');

const app = express();

mongoose.connect('mongodb+srv://griff:LpQWEt6aziPNPeOQ@maincluster-7uj7z.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet d'exploiter le corps de la requête
app.use(bodyParser.json());
app.use('/api/json', jsonRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/ad', adRoutes);
app.use('/api/application', applicationRoutes);

module.exports = app;