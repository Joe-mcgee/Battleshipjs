const express = require('express');
const app = express();
// set static directory
app.use(express.static('public'));
//use ejs templating engine
app.set('view engine', 'ejs');
//home route
app.get('/', (req, res) => {
  res.render('home');
});

//
app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  res.render('new')
});

app.listen(8080);

console.log('listening on port 8080');
