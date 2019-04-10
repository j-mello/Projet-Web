"use strict"

const express = require('express')

const router = express.Router();
const utils = require('../db/utils')
router.get('/', (req, res) => {
    res.render('accueil', {})
  })
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
  })
router.post('/send', (req, res) => {
    const formBody = req.body
    
    utils.executeQuery("SELECT * FROM UTILISATEURS WHERE identifiant = ($1) AND password = ($2)", [formBody.id, formBody.password], (result) => {
      let resultMessage = ''
      const userFound = result.rows[0]
  
      // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie
      if (userFound) {
        req.session.userId = userFound.id
        req.session.username = userFound.identifiant
        res.locals.username = userFound.identifiant

        resultMessage = `Vous êtes connecté en temps que ${req.session.username}`
        console.log("Connexion réussie !")
      } else {
        resultMessage = "L'identifiant ou le mot de passe sont incorect"
      }
      res.render('profil', {
        info: resultMessage
      })
    })
  })

module.exports = router