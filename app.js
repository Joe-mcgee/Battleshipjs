const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// set static directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//use ejs templating engine
app.set('view engine', 'ejs');
//home route
app.get('/', (req, res) => {
  res.render('home');
});

//
app.get('/new', (req, res) => {
  let templateVars = {player: 'player 1',
                      url: '/addPlayerone'};
  res.render('new', templateVars);
});

app.post('/new', (req, res) => {
  let templateVars = {player: 'player 1',
                      url: '/addPlayerone'}
  res.render('new', templateVars);
});

app.post('/addPlayerone', (req, res) => {
console.log(req.body);
res.redirect('newp2');

});

app.post('/addPlayerTwo', (req, res) => {
  console.log(req.body)
  res.redirect('inter1')
})

app.get('/newp2', (req, res) => {
  let templateVars = {
    player: 'player 2',
    url: '/addPlayerTwo'
  };
  res.render('new', templateVars);
});


app.get('/inter1', (req, res) => {
  let templateVars = {player: 'player1',
                      url: '/player1turn'}
  res.render('inter', templateVars)
})

app.post('/player1turn', (req, res) => {
  res.render('player1turn')
})

app.get('/player1turn', (req, res) => {
  let templateVars = {player: 'player 1',
                      url: '/inter2'}
  res.render('player1turn', templateVars)
});

app.post('/inter2', (req, res) => {
  res.render('inter2');
})

app.get('/inter2', (req, res) => {
  let templateVars = {player: 'player 2',
                      url: '/player2turn'}
  res.render('inter2', templateVars)
})

app.post('/player2turn', (req, res) => {
  res.render('player2turn');
})

app.get('/player2turn', (req, res) => {
  let templateVars = {player: 'player 2',
                        url: '/inter1'}
  res.render('player2turn', templateVars);
})

app.listen(8080);

console.log('listening on port 8080');



