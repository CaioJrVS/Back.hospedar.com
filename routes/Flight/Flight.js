const mongoose = require('mongoose');
const Flight = require('../../models/Flight');
const Amadeus = require("amadeus");

var express = require('express');
const { exists } = require('../../models/Flight');
var router = express.Router();
const { CLIENT_ID, CLIENT_SECRET } = require('../../config');

const amadeus = new Amadeus({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

router.get('/Airports', async (req, res) => {
    const { page, subType, keyword } = req.query;
    // API call with params we requested from client app
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": page * 10
    });
    // Sending response for client
    console.log(JSON.parse(response.body));
    try {
      await res.json(JSON.parse(response.body));
    } catch (err) {
      await res.json(err);
    }
  });

router.get('/FlightOffers', async (req, res) => {
    const { originLocationCode, destinationLocationCode, departureDate, adults } = req.query;
    // API call with params we requested from client app
    const response = await amadeus.client.get("/v2/shopping/flight-offers", {
        originLocationCode, 
        destinationLocationCode, 
        departureDate, 
        adults
    });
    
    // Sending response for client
    console.log(JSON.parse(response.body));
    try {
      await res.json(JSON.parse(response.body));
    } catch (err) {
      await res.json(err);
    }
  });

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

router.get('/DestinationFlights', function(req, res, next) {
    Flight.findOne({ 
        route: {origin: req.query.origin, destination: req.query.destination}
    }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          console.log(req.params);
          res.json(docs)
        }
    })
})

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