var express = require('express');
var router = express.Router();


var candies = [
  {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
  {'id': 2, 'name': 'Pez', 'color': 'Green'},
  {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
  {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
];

var validColors = ['Red', 'Green', 'Blue', 'Pink', 'Black'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Candies' });
});

// CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ROOT
router.get('/', (req, res) => {
  res.status(200).json(
    {
      api_version: 'v1.0.0',
      candies: '/candies'
    });
});

// INDEX
router.get('/candies', (req, res) => {
  res.json(candies);
});

// SHOW
router.get('/candies/:id', (req, res) => {
  res.status(200).json(candies[req.params.id - 1]);
});

// CREATE
router.post('/candies', (req, res) => {
  console.log(req.body);
  res.status(201).json({message: 'Candy created',
  id: req.body.id,
  name: req.body.name,
  color: req.body.color
  });

  var candy = {
    id: parseInt(req.body.id, 10),
    name: req.body.name,
    color: req.body.color
  }

  if (validColors.indexOf(candy.color) !== -1) {
  candies.push(candy);
  }
  else {
    res.status(422).json({
      message: `Candy ${req.params.id} not valid and not created.`});
  }
});

// UPDATE
router.put('/candies/:id', (req, res) => {
  res.status(200).json({
    message: `Candy ${req.params.id} updated`,
    id: req.body.id,
    name: req.body.name,
    color: req.body.color
  });

candies[req.body.id - 1].id = req.body.id;
candies[req.body.id - 1].name = req.body.name;
candies[req.body.id - 1].color = req.body.color;

});

// DELETE/DESTROY
router.delete('/candies/:id', (req, res) => {
  res.status(200).json({
    message: `Candy ${req.params.id} deleted`});
    candies.splice(req.params.id - 1, 1);
});

module.exports = router;

//
// var express = require('express');
// var router = express.Router();
//
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// var candies = [
//   {"id":1,"name":"Chewing Gum", "color":"Red"},
//   {"id":2,"name":"Pez","color":"Green"},
//   {"id":3,"name":"Marshmallow","color":"Pink"},
//   {"id":4,"name":"Candy Stick","color":"Blue"}
// ];
//
// // INDEX
// router.get('/candies/', (req, res) => {
//   res.status(200).json(candies);
// });
//
// // SHOW
// router.get('/candies/:id', (req, res) => {
//   res.status(200).json(candies[req.params.id - 1]);
// });
//
// // CREATE
// router.post('/candies', (req, res, next) => {
//   var validColors = ['Red', 'Green', 'Blue', 'Pink', 'Black', 'Magenta'];
//   console.log(req.body);
//   res.status(201).json({
//     message: 'candy created',
//     id: req.body.id,
//     name: req.body.name,
//     color: req.body.color
//   });
//   var candy = {
//     id: parseInt(req.body.id),
//     name: req.body.name,
//     color: req.body.color
//   }
//
//   if (validColors.indexOf(candy.color) !== -1) {
//     candies.push(candy);
//   } else {
//     router.get('/candies/', (req, res) => {
//       res.status(422).json({ message: `Candy ${req.params.id} has an invalid input`});
//     });
//   }
//
// });
// // UPDATE
// router.put('/candies/:id', (req, res) => {
//   res.status(200).json({
//     message: `candy ${req.params.id} updated`,
//     name: req.body.name,
//     color: req.body.color
//   });
//   candies[req.params.id-1].id = req.body.id;
//   candies[req.params.id-1].name = req.body.name;
//   candies[req.params.id-1].color = req.body.color;
// });
// // DESTROY
// router.delete('/candies/:id', (req, res) => {
//   res.status(200).json({message: `Candy ${req.params.id} deleted`});
//   candies.splice(req.params.id-1, 1);
// });
//
// module.exports = router;
