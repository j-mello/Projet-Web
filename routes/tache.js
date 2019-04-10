"use strict";

const express = require('express')
const router = express.Router();

const utils = require('../db/utils')

router.get('/', (req, res) => {
    utils.executeQuery("select * from TACHES", [], (result) => {
      res.render('taches', {
        info : req.session.id,
        tasksList: result.rows
      })
    })
  })
  
  router.get('/:id([0-9]*[0-9]*)', (req, res) => {
    utils.executeQuery("SELECT * FROM TACHES WHERE id = $1;", [req.params.id], (result) => {
      res.render('taches_details', {
        taskDetails: result.rows[0]
      })
    })
  })
  
  router.get('/add', (req, res) => {
    res.render('ajout_taches')
  })
  
  router.post('/createTaches', (req, res) => {
    const form = req.body
    utils.executeQuery("INSERT INTO TACHES (nomTache, descriptionTache) VALUES ($1,$2);", [form.nomTache, form.descriptionTache], (result) => {
      res.render('ajout_taches', {
        message: 'Projet ajouté avec succès'
      })
    })
  })


module.exports = router