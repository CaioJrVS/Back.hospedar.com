const mongoose = require('mongoose');
const Flight = require('../../models/Flight');

var express = require('express');
const { exists } = require('../../models/Flight');
var router = express.Router();

router.get('/CardFlights', function(req, res, next) {
    Flight.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.json(docs)
      }
    }).limit(10);
});

router.get('/HomeCardFlights', function(req, res, next) {
    Flight.find({})
        .or([
            {route: {origin: 'Rio de Janeiro', destination: 'Bahia'}},
            {route: {origin: 'Rio de Janeiro', destination: 'São Paulo'}},
            {route: {origin: 'Rio de Janeiro', destination: 'Santa Catarina'}},
            {route: {origin: 'Rio de Janeiro', destination: 'Esp�rito Santo'}},
            {route: {origin: 'Rio de Janeiro', destination: 'Minas Gerais'}},
        ])
        .limit(5)
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log(docs);
                res.json(docs);
            }
        });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
