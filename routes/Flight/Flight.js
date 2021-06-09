const mongoose = require('mongoose');
const Flight = require('../../models/Flight');
const Amadeus = require("amadeus");
var express = require('express');
var router = express.Router();
const { CLIENT_ID, CLIENT_SECRET } = require('../../config');
const IATA = require('../../public/shared/IATAcodesWorld.json');

const amadeus = new Amadeus({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

router.get('/Inspiration', (req, res) => {
    const {origin} = req.query;
    amadeus.shopping.flightDestinations.get({
        origin
    }).then(function(response){
        console.log(response.data);
        res.json(response.data);
      }).catch(function(responseError){
        console.log(responseError);
    });
})


router.get('/Price', async (req, res) => {
    const { originLocationCode, destinationLocationCode, departureDate, adults } = req.query;

    amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults
    }).then(function(response){
        return amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            'data': {
            'type': 'flight-offers-pricing',
            'flightOffers': [response.data[0]]
            }
        })
        )
    }).then(function(response){
        console.log(response.data);
        res.json(response.data.flightOffers[0].price);
    }).catch(function(responseError){
        console.log(responseError);
    }); 
})

router.get('/SeatMaps', async (req, res) => {

    let { origin, destination, departureDate, adults } = req.query;
    origin = origin.toUpperCase();
    destination = destination.toUpperCase();

    const originLocationCode = IATA[origin];
    const destinationLocationCode = IATA[destination];

    amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults
    }).then(function(response){
        return amadeus.shopping.seatmaps.post(
            JSON.stringify({ 'data': [response.data[0]] })
        );
    }).then(function(response){
      console.log(response.data);
      res.json(response.data);
    }).catch(function(responseError){
      console.log(responseError);
    });
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
    let { origin, destination, departureDate, adults } = req.query;
    console.log(departureDate, adults);
    origin = origin.toUpperCase();
    destination = destination.toUpperCase();

    const originLocationCode = IATA[origin];
    const destinationLocationCode = IATA[destination];
    
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults
    }).then(function(response){
        console.log(response.data);
        res.json(response.data);
    }).catch(function(responseError){
        console.log(responseError);
    });

});

module.exports = router;