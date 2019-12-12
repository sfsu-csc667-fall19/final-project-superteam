const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
const mongoURI = 'mongodb://localhost:27017/chatDB';

const port = process.env.PORT || 3001;

process.env.SECRET_KEY = 'secret';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: false}))

mongoose.connect( mongoURI, {userNewUrlParser: true});


//Register new users
app.post('/service1/register', (req, res) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(!user) {
      User.create(newUser)
        .then(user => {
          res.json(true)
        })
        .catch(err => {
          res.send('error: ' + err)
        })
  
    }else {
      res.json(false)
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

//User authentication
app.post('/service1/login', (req, res) => {
  User.findOne({
      email: req.body.email
  })
   .then(user => {
     if(user) {
       if(req.body.password === user.password && req.body.email === user.email) {
         res.send({name: user.username, response: true})
       }else{
         console.log('User does not exist')
         res.josn({response: false})
       }
     }else{
       console.log('User does not exist')
       res.json({response: false})
     }
   })
    .catch(err => {
      res.send('error: ' + err)
    })
})


app.listen(port, () => console.log(`service1 listening on port ${port}!`));

