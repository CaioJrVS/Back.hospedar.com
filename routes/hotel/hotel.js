var express = require('express');
var router = express.Router();
const Hotel = require('../../models/Hotel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("HOTEL")
});

router.post('/Create', (req,res,next) =>{
  const body = req.body;
  console.log(req.body);
  const newHotel = new Hotel({
    name: body.name,
    location:{
      state: body.state,
      city: body.city,
    },
    bedroom:[{
      persons: body.persons,
      bed: body.bed 
    }],
    images: body.images
  });

    newHotel.save()
    .then( data =>{
      res.json(data);
    })
    .catch(err=>{
      res.json({ message: err });
    })
});

module.exports = router;
