var express = require('express');
var router = express.Router();
let db = require('../database/models');
const { Op } = require("sequelize");
const Actor = require('../database/models/Actor');

const peliculasController = {
    all: function(req, res) {
      db.Actor.findAll({
        include: [
          {association: "peliculas"}
          ],
        where: {
          status: 1
        },
        order: [
          ['first_name', 'ASC'],
          ]
      })
        .then(function(result){
          res.render('listadoActores', {
            actores: result
          })
        })
      
    },
    filter: function(req, res) {
      db.Actor.findAll({
        where: {
            first_name: {
          [Op.like]: req.params.letra + '%',
          },
          status: 1
        },
        order: [
          ['first_name', 'ASC'],
          ]
      })
        .then(function(result){
          res.render('listadoActores', {
            actores: result
          })
        })
    },
    crear: function(req, res) {
      
        return res.render('createActor');
      
    },
    crearAdd: function(req, res) {
      db.Actor.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        rating: req.body.rating,
        status: 1
    })
      .then(function(result){
        res.redirect('/actores')
      })
    },
    detalle: function(req, res) {
      db.Actor.findByPk(req.params.id, {
        include: [
          {association: "peliculas"}
          ],
      })
        .then(function(result){
          //res.send(result)
          res.render('detalleActor', {
            actor: result
          })
     })
    },
    edit: function(req, res) {
      let promesaActor = db.Actor.findByPk(req.params.id, {
        include: [
          {association: "peliculas"}
          ]
      })
      let promesaPeliculas = db.Movie.findAll()
      Promise.all([promesaActor, promesaPeliculas])
        .then(function([resultadoActor, resultadoPeliculas]){
          //res.send(resultadoGeneros)
          res.render('editActor', {
            actor: resultadoActor,
            peliculas: resultadoPeliculas
          })
        })
    },
    editSave: function(req, res) {
      db.Movie.update({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        length: req.body.length,
        status: req.body.status,
        trailer: req.body.trailer,
        genre_id: req.body.genero
      },
      { where: {
        id: req.params.id
      }
      })
      .then(function(result){
        res.redirect('/peliculas')
      })
    },
    delete: function(req, res) {
      db.Actor.update({
        status: 0
      },
      { where: {
        id: req.params.id
      }
      })
        .then(function(result){

          res.redirect('/actores')
        })
    },
    /*deleteSave: function(req, res) {
      db.Movie.destroy({
        where: {
        id: req.params.id
      }
      })
        .then(function(result){

          res.redirect('/peliculas')
        })
    },*/
    verEliminados: function(req, res) {
      db.Actor.findAll({
        where: {
          status: 0
        }
      })
        .then(function(result){
          res.render('recuperarActoresEliminados', {
            actores: result
          })
        })
    },
    recuperarEliminados: function(req, res) {
          db.Actor.update({
            status: 1
          },
          { where: {
              id: req.params.id
          }
          })
            .then(function(result){
          
          res.redirect('/actores')
        })
    
  }
    
}

module.exports = peliculasController