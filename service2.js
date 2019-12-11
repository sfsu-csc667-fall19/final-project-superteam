const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Notes = require('./models/notes');
const User = require('./models/user');
const Topic = require('./models/topic');
const axios = require('axios');
const app = express();
const mongoURI = 'mongodb://localhost:27017/notes_collection';

const port = process.env.PORT || 3002;

const client = redis.createClient();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: false}))

mongoose.connect( mongoURI, {userNewUrlParser: true});

//update notes in db
app.get('/service2/update', (req, res) => {
  Notes.findByIdAndUpdate(req.query.id, {content: req.query.notes})
    .then(note => {
      res.send('Notes succesfully updated')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//add new notes to db
app.post('/service2/newNotes', (req, res) => {
  
    const today = new Date();
    const newNotes = {
      content: req.body.content,
      username: req.body.username,
      dateCreated: today
    }

    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(user) {
          Notes.create(newNotes)
            .then(note => {
              note.save();//have to save it before push
              user.notes.push(note);
              user.save();
              //send status back as true if notes is successfully added and user's email for notes edition purpose
              res.json({response: true, email: user.email})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      }else {
        res.json({response: false});
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  });

  //add a topic to db
  app.post('/service2/newTopic', (req, res) => {
    const newTopic = {
      topic: req.body.topic,
      username: req.body.username,
    }

    Topic.create(newTopic)
      .then(topic => {
        topic.save();//have to save it before push
        //send status back as true if notes is successfully added and user's email for notes edition purpose
        res.json({response: true})
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  });

  //fetch all topic
  app.get('/service2/topic', (req, res) => {
    Topic
    .find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((e) => {
      res.send('Error');
    });
});

  //fetch all notes from db
  app.get('/service2/notes', (req, res) => {
      Notes
      .find({})
      .then((docs) => {
        res.send(docs);
      })
      .catch((e) => {
        res.send('Error');
      });
  });


app.use((req, res, next) => {
  if(!req.cookies.email || !req.cookies.password) {
    res.status(403);
    return res.send('You need access to this endpoint');
  }

  const body = {
    email: req.cookies.email,
    password: req.cookies.password,
  };

  const key = req.cookies.email + '_' + req.cookies.password;
  console.log(body)
  console.log(key)
  client.get(key, (err, cachedValue) => {
    if(cachedValue != null) {
      if(cachedValue === 'true') {
        return next();
      }else{
        res.status(403);
        return res.send('You need access to this endpoint');
      }
    }else{
      axios.post('http://localhost:3001/service1/login', body)
        .then(res => {
          if(res.data.response){
            client.set(key, true);
            return next();
          }else{
            client.set(key, false);
            res.status(403);
            return res.send('You need access to this endpoint');
          }
        })
        .catch(console.log)
    }
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))