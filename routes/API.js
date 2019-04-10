"use strict"

const express = require('express')
const router = express.Router()
const utils = require('../db/utils')

// Ajout d'une nouvelle liste

router.post('/ajoutListe', (req, res) => {
    const params = req.body
    utils.executeQuery("Insert into LISTES (nomListe, idUser) values ($1,$2);", [params.nomListe, req.session.userId], (result) => {
      res.json({ message: "Liste ajoutée" })
    })
  })
  
  // Ajout d'une nouvelle tâche

  router.post('/ajoutTache', (req, res) => {
    const params = req.body
    utils.executeQuery("Insert into TACHES (nomTache, descriptionTache,dateLimite, idListe) values ($1,$2,$3,$4);", [params.nomTache, params.descriptionTaches,params.dateLimite,params.idListe], (result) => {
      res.json({ message: "Tâche ajoutée" })
    })
  })
  
  // Obtenir les listes de tâches

  router.get('/obtenirListe', (req, res) => {
    let sortBy = req.body.sortBy
    let orderByString = ''
  
    switch (sortBy) {
      case 'name_asc':
        orderByString = 'name ASC'
        break;
  
      case 'name_desc':
        orderByString = 'name DESC'
        break;
  
      case 'createdAt_asc':
        orderByString = 'created_at ASC'
        break;
  
      case 'createdAt_asc':
        orderByString = 'created_at DESC'
        break;
  
      default:
        orderByString = 'id DESC'
        break;
    }
    req.session.userId=1;
    utils.executeQuery(`Select nomListe, idListe from LISTES where idUser = ($1) order by ${orderByString};`, [req.session.userId], (result) => {
      res.json({ lists_from_api: result.rows })
    })
  })
  
  // Obtenir les tâches d'une liste

  router.get('/taches', (req, res) => {
    let sortBy = req.query.sortBy
    let orderByString = ''
    const params = req.body
  
    switch (sortBy) {
      case 'name_asc':
        orderByString = 'name ASC'
        break;
  
      case 'name_desc':
        orderByString = 'name DESC'
        break;
  
      case 'createdAt_asc':
        orderByString = 'created_at ASC'
        break;
  
      case 'createdAt_asc':
        orderByString = 'created_at DESC'
        break;
  
      default:
        orderByString = 'id DESC'
        break;
    }
  
    utils.executeQuery(`Select * from TACHES order by ${orderByString} where idListe = ($1);`, [params.idListe], (result) => {
      res.json({ projectsList: result.rows })
    })
  })
  
  
  // Supprimer une liste de tâches dont l'ID est donné en paramètre

  router.delete('/listes/:id([0-9]*[0-9]*)', (req, res) => {
    let idListe = req.params.id;
    utils.executeQuery("Delete from LISTES where idListe = $1;", [idListe], (result) => {
      res.json({ message: "Liste de tâches supprimée" })
    })
  })
  
  // Supprimer une tâche dont l'ID est donné en paramètre

  router.delete('/taches/:id([0-9]*[0-9]*)', (req, res) => {
    let Idtache = req.params.id;
    utils.executeQuery("Delete from TACHES where idTache = $1;", [Idtache], (result) => {
      res.json({ message: "Tâche supprimée" })
    })
  })
  
  // Afficher le detail de la tâche dont on donne l'ID

  router.get('/taches/:id([0-9]*[0-9]*)', (req, res) => {
    utils.executeQuery("Select * from TACHES where idTache = $1;", [req.params.id], (result) => {
      res.json({ task: result.rows[0] })
    })
  })
  
  // Mettre à jour la tâche dont l'ID est passé en param

  router.patch('/taches/:id([0-9]*)', (req, res) => {
    let idtache = req.params.id;
    utils.executeQuery("Update TACHES set where nomTache = $1, descriptionTache = $2 where idTache = $3;", [req.params.nomTache, req.params.descriptionTache, req.params.id], (result) => {
      res.json({ message: "Tâche mise à jour" })
    })
  })

module.exports = router