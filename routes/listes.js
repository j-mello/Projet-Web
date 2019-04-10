"use strict";

const express = require('express')
const router = express.Router();
const utils = require('../db/utils')

router.get('/', (req, res) => {
  utils.executeQuery("select * from taches", [], (result) => {
    res.render('listes', {
      info : req.session.username,
      ListesList: result.rows
    })
  })
})

router.get('/add', (req, res) => {
  res.render('ajout_listes')
})

router.post('/createTache', (req, res) => {
  const form = req.body
  utils.executeQuery("INSERT INTO TACHES (nomTache) VALUES ($1);", [form.nomTache], (result) => {
    res.render('ajout_listes', {
      message: 'Tâche ajoutée avec succès'
    })
  })
})

module.exports = router

