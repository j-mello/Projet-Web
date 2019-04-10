'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session');
const defaultRoutes = require('./routes/accueil')
const creaCompteRoutes = require('./routes/creercompte')
const profil = require('./routes/profil')
const listes = require('./routes/listes')
const taches = require('./routes/tache')

// Middleware de gestion des cookie
const sessionParams = {
  secret: "my_secret",
  saveUninitialized: true,
  maxAge: 2 * 60 * 60 * 1000 
};
app.use(session(sessionParams));

// Reuse the user each time
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    res.locals.username = req.session.username;
  }
  next();
});

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true}))

app.set('view engine', 'pug');

app.use(bodyParser.json())

app.use('/', defaultRoutes)
app.use('/creercompte',creaCompteRoutes)
app.use('/profil',profil)
app.use('/listes',listes)
app.use('/tache',taches)

app.listen('3000', () =>{
    console.log("Serveur demarre avec succès")
})
