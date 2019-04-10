"use strict"

const express = require('express')
const nodemailer = require('nodemailer')
const utils = require('../db/utils')
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'projetwebas2019@gmail.com',
          pass : 'lewebcestop'
  }
})

router.get('/', (req, res) => {
    res.render('creercompte', {})
  })

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
  })
router.post('/create', (req, res) => {
    const formBody = req.body

    utils.executeQuery("Insert into UTILISATEURS(identifiant, password, email, birthdate) values($1,$2,$3,$4)", [formBody.createid, formBody.createpassword, formBody.createemail, formBody.createbirthdate], (result) => {
    res.render('accueil', {
              message : 'Inscription faite avec succès'
      })
    })
    let mailOptions = {from : 'projetwebas2019@gmail.com',
                            to   : `${formBody.createemail}`,
                            subject : 'Inscription',
                            html : `<p> Vous êtes maintenant inscrit sur notre site ! Passez un bon moment parmi nous. <br/> 
                              Pour rappel, voici votre pseudo : ${formBody.createid} et votre mot de passe : ${formBody.createpassword} <br/>
                              A très bientôt ! </p>`}
    transporter.sendMail(mailOptions, function (error, info){
      if (error){return console.log(error)}
      console.log('Message envoyé' + info.response)
    })
    transporter.close();
  })
module.exports = router