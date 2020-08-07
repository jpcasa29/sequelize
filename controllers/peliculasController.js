var express = require('express');
var router = express.Router();
let db = require('../database/models');
const { Op } = require("sequelize");
const Movie = require('../database/models/Movie');

const peliculasController = {
    all: function(req, res) {
      db.Movie.findAll({
        include: [
          {association: "actores"}
          ],
        where: {
          status: 1
        },
        order: [
          ['title', 'ASC'],
          ]
      })
        .then(function(result){
          res.render('listadoPeliculas', {
            peliculas: result
          })
        })
      
    },
    filter: function(req, res) {
      db.Movie.findAll({
        where: {
          title: {
          [Op.like]: req.params.letra + '%',
          },
          status: 1
        },
        order: [
          ['title', 'ASC'],
          ]
      })
        .then(function(result){
          res.render('listadoPeliculas', {
            peliculas: result
          })
        })
    },
    crear: function(req, res) {
      db.Genero.findAll()
        .then(function(generos){
          return res.render('create', {
            generos: generos
          })
      
        })
        
    },
    crearAdd: function(req, res) {
      db.Movie.create({
        title: req.body.title,
        rating: req.body.rating,
        release_date: req.body.release_date,
        awards: req.body.awards,
        length: req.body.length,
        status: 1,
        trailer: req.body.trailer,
        genre_id: req.body.genero
      })
      .then(function(result){
        res.redirect('/peliculas')
      })
    },
    detalle: function(req, res) {
      db.Movie.findByPk(req.params.id, {
        include: [
          {association: "actores"},
          {association: "genero"}
          ],
      })
        .then(function(result){
          //res.send(result.actores)
          res.render('detalle', {
            pelicula: result
          })
     })
    },
    edit: function(req, res) {
      let promesaPelicula = db.Movie.findByPk(req.params.id, {
        include: [
          {association: "genero"}
          ]
      })
      let promesaGeneros = db.Genero.findAll()
      Promise.all([promesaPelicula, promesaGeneros])
        .then(function([resultadoPelicula, resultadoGeneros]){
          //res.send(resultadoGeneros)
          res.render('edit', {
            pelicula: resultadoPelicula,
            generos: resultadoGeneros
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
      db.Movie.update({
        status: 0
      },
      { where: {
        id: req.params.id
      }
      })
        .then(function(result){

          res.redirect('/peliculas')
        })
    },
    deleteSave: function(req, res) {
      db.Movie.destroy({
        where: {
        id: req.params.id
      }
      })
        .then(function(result){

          res.redirect('/peliculas')
        })
    },
    verEliminadas: function(req, res) {
      db.Movie.findAll({
        where: {
          status: 0
        }
      })
        .then(function(result){
          res.render('recuperarEliminadas', {
            peliculas: result
          })
        })
    },
    recuperarEliminadas: function(req, res) {
          db.Movie.update({
            status: 1
          },
          { where: {
              id: req.params.id
          }
          })
            .then(function(result){
          
          res.redirect('/peliculas')
        })
    
  }
    
}

module.exports = peliculasController