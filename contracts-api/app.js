const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const contracts = require('./models/contract.js');

// ==== Init app ====
const app = express();

// ==== Body Parser Middleware ====
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contracts', {useMongoClient: true})
  .then(function() {
     console.log('Successfully connected to MongoDB!')
  }).catch(function(err) {
     console.error(err)
  });

app.get('/', function(req, res, next) {
     res.send("Welcome to Contracts API");
});

app.get('/contract', function(req, res) {
   // Code for handling products(data) to be returned as JSON
   contracts.find({}, (err, results) => {
     if(err) {
       res.json({
         confirmation: 'fail',
         err: err.message
       })
     } else {
       res.json({
         confirmation: 'success',
         data: results
       })
     }
   })
});

app.post('/contract', function(req, res) {
   // Code for handling create product to DB and return as JSON
   contracts.create(req.body, (err, result) => {
    if(err) {
      res.json({
        confirmation: 'fail',
        err: err.message
      })
    } else {
      res.json({
        confirmation: 'success',
        data: result
      })
    }
  })
});

/* GET PRODUCT */
app.get('/contract/:id', function(req, res) {
  contracts.findById(req.params.id, (err, result) => {
    if(err) {
      res.json({
        confirmation: 'fail',
        err: err.message
      })
    } else {
      res.json({
        confirmation: 'success',
        data: result
      })
    }
  })
   // Code for getting one specific product and return as JSON
});

/* UPDATE PRODUCT */
app.put('/contract/update/:id', function(req, res) {
  contracts.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
    if(err) {
      res.json({
        confirmation: 'fail',
        err: err.message
      })
    } else {
      res.json({
        confirmation: 'success',
        data: result
      })
    }
  })
   // Code for updating one specific product and return as JSON
});

/* DELETE PRODUCT */
app.delete('/contract/delete/:id', function(req, res) {
   // Code to delete one specific product and return message as JSON
   contracts.deleteOne({_id: req.params.id}, (err, result)=> {
     if(err) {
      res.json({
        confirmation: 'fail',
        err: err.message
      })
    } else {
      res.json({
        confirmation: 'success',
        data: result
      })
    }
   })
});

app.listen(3000, () => {
  console.log('Express server is running at http://127.0.0.1:3000');
});
