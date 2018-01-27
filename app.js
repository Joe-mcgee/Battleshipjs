const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// set static directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


let tempdb = {};




function getGameId(tempdb) {
  let output = 0;
  for (id in tempdb) {
    output += 1;
  }
  return output;
}

function Player(name, coords) {
  this.name = name;
  this.ships = {Carrier: [],
                Battleship: [],
                Submarine: [],
                Cruiser: [],
                Destroyer: []
              }

  console.log(this.ships)
  for (coord in coords) {
    let cruiser = RegExp("^Cruiser")
    if (cruiser.test(coords[coord])) {
      this.ships['Cruiser'].push(coord);
    }
    let submarine = RegExp("^Submarine")
    if (submarine.test(coords[coord])) {
      this.ships['Submarine'].push(coord);
    }
    let carrier = RegExp("^Carrier");
    if (carrier.test(coords[coord])) {
      this.ships['Carrier'].push(coord)
    }
    let battleship = RegExp("^Battleship");
    if (battleship.test(coords[coord])) {
      this.ships['Battleship'].push(coord);
    }
    let destroyer = RegExp("^Destroyer")
    if (destroyer.test(coords[coord])) {
      this.ships['Destroyer'].test(coord);
    }
  }
}
function filterName(form) {
  let result = form;
  for (let key in result) {
    if (key === 'name') {
      delete result[key];
    }
  }
  return result;
}



//use ejs templating engine
app.set('view engine', 'ejs');
//home route, starts game and inits options
app.get('/', (req, res) => {
  res.render('home');
});

// renders add ships for player 1
app.get('/new', (req, res) => {
  let templateVars = {
    player: 'player 1',
    url: '/addPlayerone'
  };
  res.render('new', templateVars);
});

//posts options and init to server
app.post('/new', (req, res) => {

  let templateVars = {
    player: 'player 1',
    url: '/addPlayerone'
  };
  res.redirect('/new');
});

// posts player ones ships to server
app.post('/addPlayerone', (req, res) => {
  let id = tempdb[Object.keys(tempdb)[Object.keys(tempdb).length - 1]]
  let name = req.body.name;
  let form = req.body;
  let coords = filterName(form);

  let player1 = new Player(name, coords)

  console.log(player1)

  res.redirect('newp2');

});

// posts player twos ships to server, initializes the pass screen
app.post('/addPlayerTwo', (req, res) => {
  console.log(req.body);
  res.redirect('inter1');
});

// renders player 2's ship placement
app.get('/newp2', (req, res) => {
  let templateVars = {
    player: 'player 2',
    url: '/addPlayerTwo'
  };
  res.render('new', templateVars);
});


// pass screen between player two and player one
app.get('/inter1', (req, res) => {
  let templateVars = {
    player: 'player1',
    url: '/player1turn'
  };
  res.render('inter', templateVars);
});

// posts player ones move to server
app.post('/player1turn', (req, res) => {
  res.redirect('player1turn');
});


app.get('/player1turn', (req, res) => {
  let templateVars = {
    player: 'player 1',
    url: '/inter2'
  };
  res.render('player1turn', templateVars);
});

app.post('/inter2', (req, res) => {
  res.render('inter2');
});

app.get('/inter2', (req, res) => {
  let templateVars = {
    player: 'player 2',
    url: '/player2turn'
  };
  res.render('inter2', templateVars);
});

app.post('/player2turn', (req, res) => {
  res.render('player2turn');
});

app.get('/player2turn', (req, res) => {
  let templateVars = {
    player: 'player 2',
    url: '/inter1'
  };
  res.render('player2turn', templateVars);
});

app.listen(8080);

console.log('listening on port 8080');
