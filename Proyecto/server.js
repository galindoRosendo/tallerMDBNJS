//dependencies
const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

//App configs
app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  db.collection('alumnos').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {alumnos: result})
    })
//})
  //res.sendFile(__dirname + '/index.html');
  //console.log(__dirname);
});

app.get('/update', (req, res) => {
  db.collection('alumnos').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('update.html.ejs', {alumnos: result})
    })
//})
  //res.sendFile(__dirname + '/index.html');
  //console.log(__dirname);
});

app.get('/delete', (req, res) => {
  db.collection('alumnos').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('delete.html.ejs', {alumnos: result})
    })
//})
  //res.sendFile(__dirname + '/index.html');
  //console.log(__dirname);
});

app.post('/alumnos', (req, res) => {
  db.collection('alumnos').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
  //console.log(req.body);
});

app.put('/alumnos', (req, res) => {
  // Handle put request
  //console.log(req);
  db.collection('alumnos').findOneAndUpdate(
    {name: req.body.name}, {
    $set: {
      name: req.body.name,
      control: req.body.control
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});

app.delete('/alumnos', (req, res) => {
  //console.log(req);
  db.collection('alumnos').findOneAndDelete({control: req.body.control},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send(result)
  });
});

var db

MongoClient.connect('mongodb://localhost:27017/taller', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
