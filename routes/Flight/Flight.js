const mongoose = require('mongoose');
const Flight = require('../../models/Flight');

var express = require('express');
var router = express.Router();

router.get('/CardFlights', function(req, res, next) {
    Flight.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.json(docs)
      }
    });
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
