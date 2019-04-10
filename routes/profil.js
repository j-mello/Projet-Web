"use strict";

const express = require('express')
const router = express.Router();
const utils = require('../db/utils')


router.get('/', (req, res) => {
    res.render('profil', {
      info : req.session.username,
      ListesList: result.rows
    })
  })

router.get('/listes', (req, res)=> {
  res.render('listes', {
    info : req.session.username,
    ListesList: result.rows
  })

})


  module.exports = router

