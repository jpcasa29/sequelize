var express = require('express');
var router = express.Router();
let db = require('../database/models');
const { Op } = require("sequelize");


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
        
        for(let i=0; i<req.files.length; i++){
          db.MovieImage.create({
            movies_id: result.id,
            image: req.files[i].filename
          }).then(function(response){
            console.log(response)
          })
        }
        

        res.redirect('/peliculas')
      })
    },
    detalle: function(req, res) {
      let imagenes = [];
      db.Movie.findByPk(req.params.id, {
        include: [
          {association: "actores"},
          {association: "genero"}
          ],
      })
        .then(function(result){
          db.MovieImage.findAll({
            where: {
              movies_id: result.id,
              }
            })
            .then(function(response) {
              for(let i=0; i<response.length; i++){
                imagenes.push(response[i].dataValues)
              }
              //imagenes = response[0].dataValues
              console.log(imagenes)
              return res.render('detalle', {
                pelicula: result,
                imagenes: imagenes
              })
              
            })
            
          //res.send(result.actores)
          
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
      db.MovieImage.destroy({
        where: {
          movies_id: req.params.id
        }
      })
      .then(function(result){
        db.Movie.destroy({
          where: {
          id: req.params.id
        }
        })
          .then(function(response){
          console.log(response)
          })
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