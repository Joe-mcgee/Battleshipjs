const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');
const aiSetup = require('./ai-setup.js');
/*const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:2017/battleshipDb';
const dbName = 'battleshipDb'
MongoClient.connect(url, (err, client) => {

})
*/
// set static directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


const fleet = [{ 'Carrier': 5 },
  { 'Battleship': 4 },
  { 'Submarine': 3 },
  { 'Cruiser': 3 },
  { 'Destroyer': 2 }
];

function makeGameId(tempdb, type, random) {
  let output = 0;
  for (id in db.tempdb) {
    output += 1;
  }
  switch (type) {
    case 'Single':
      output += 'S';
      break;
    case 'Two Player':
      output += 'T';
      break;
  }
  if (typeof random !== 'undefined') {
    output += 'R';
  }
  return output;
}

function getGameId(tempdb) {
  return Object.keys(db.tempdb)[Object.keys(db.tempdb).length - 1];
}

function Player(name, coords) {
  this.name = name;
  this.ships = {
    Carrier: [],
    Battleship: [],
    Submarine: [],
    Cruiser: [],
    Destroyer: []
  };
  for (coord in coords) {
    let cruiser = RegExp("^Cruiser");
    if (cruiser.test(coords[coord])) {
      this.ships['Cruiser'].push(coord);
    }
    let submarine = RegExp("^Submarine");
    if (submarine.test(coords[coord])) {
      this.ships['Submarine'].push(coord);
    }
    let carrier = RegExp("^Carrier");
    if (carrier.test(coords[coord])) {
      this.ships['Carrier'].push(coord);
    }
    let battleship = RegExp("^Battleship");
    if (battleship.test(coords[coord])) {
      this.ships['Battleship'].push(coord);
    }
    let destroyer = RegExp("^Destroyer");
    if (destroyer.test(coords[coord])) {
      this.ships['Destroyer'].push(coord);
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

//player is zero for p1 and 1 for p2
function getPlayerCoords(player) {
  let id = getGameId(db.tempdb);
  let name = Object.keys(db.tempdb[id])[player];
  let playerCoords = db.tempdb[id][name];
  return playerCoords;
}

//target is the ships with coords object
function checkCoords(shot, target) {
  for (ship in target) {
    let coords = target[ship];
    if (ship !== 'targets') {
      for (let i = 0; i < coords.length; i++) {
        let coord = coords[i];
        if (shot == coord) {
          return true;
        }
      }
    }
  }
  return false;
}

// params (1,0) or (0,1)
function evaluator(shooter, shotAt) {
  let id = getGameId(db.tempdb);
  let name = Object.keys(db.tempdb[id])[shooter];
  let output = [name + ' shoots at '];
  let lastShot = getPlayerCoords(shooter)['targets'].slice(-1)[0];
  let targetFleet = getPlayerCoords(shotAt);
  let hit = false;
  let win = false;
  let winCount = 0;
  if (typeof lastShot === 'undefined') {
    return 'good luck';
  } else {
    for (ship in targetFleet) {
      let coords = targetFleet[ship];
      if (ship !== 'targets') {
        let dystroyed = true;
        let killConfirm = new RegExp('^X');
        for (let i = 0; i < coords.length; i++) {
          let coord = coords[i];
          if (lastShot == coord) {
            let style = coord.replace(/^X/, '');
            output[0] += style + ': HIT';
            hit = true;
          }
          if (!killConfirm.test(coord)) {
            dystroyed = false;
            winCount += 1;
          }
        }
        if (dystroyed === true) {
          if (!output.includes(name + ' has sunk a ' + ship)) {
            output.push(' ' + name + ' has sunk a ' + ship)
          }
        }
      }
    }
    if (hit === false) {
      output[0] = name + ' shoots at ' + lastShot + ': MISS';
    }
    if (winCount === 0) {
      win = true;
      output.push(' Congratz, ' + name + ' you achieved Victory!')
    }
  }
  fullLog(output)
  return output;
}

function fullLog(logItem) {
  let id = getGameId(db.tempdb);
  db.logdb[id].push(logItem);
}

function destroyShip(shot, target) {
  for (ship in target) {
    let coords = target[ship];
    if (ship !== 'targets') {
      coords.forEach((item, i) => {
        if (item === shot) {
          target[ship][i] = 'X' + item;
        }
      });
    }
  }
}

function randomShot(previousShots) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let letter = letters[Math.floor(Math.random() * letters.length)];
  let number = numbers[Math.floor(Math.random() * numbers.length)];
  let shot = letter + '-' + number;
  let passed = !previousShots.includes(shot) && !previousShots.includes('X' + shot) ? shot : randomShot(previousShots);
  return passed;
}

function sortLeaders(winners) {
  output = {};
  winners.forEach((winner) => {
    if (output[winner]) {
      output[winner] += 1;
    } else {
      output[winner] = 1;
    }
  })
  return output
}

function findLeaders(db) {
  let output = [];
  for (id in db) {
    output.push(db[id]['win'])
  }
  return output;
}


//use ejs templating engine
app.set('view engine', 'ejs');
//home route, starts game and inits options
app.get('/', (req, res) => {
  let winners = findLeaders(db.tempdb);
  console.log()
  let leaders = sortLeaders(winners)
  console.log(leaders)
  let templateVars = {
    isHome: true,
    leaders: leaders
  }
  res.render('home', templateVars);
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
  let type = req.body.gameType[0]
  let isRandom = req.body.random
  let id = makeGameId(db.tempdb, type, isRandom);
  let player;
  let url;

  db.logdb[id] = [];
  db.tempdb[id] = {};
  /*  let templateVars = {
      player: 'player 1',
      url: '/addPlayerone'
    };*/
  res.redirect('/new');
});

// posts player ones ships to server
app.post('/addPlayerone', (req, res) => {
  let singleCheck = new RegExp('S', 'g');
  let randomCheck = new RegExp('R', 'g');
  let name = req.body.name;
  let form = req.body;
  let coords = filterName(form);
  let check = Object.keys(coords);
  if (check.length !== 17) {
    res.redirect('/new');
    return
  }
  if (name == '') {
    res.redirect('/new');
    return
  }

  let id = getGameId(db.tempdb);
  let player1 = new Player(name, coords);
  db.tempdb[id][player1.name] = player1.ships;
  db.tempdb[id][player1.name]['targets'] = [];
  if (singleCheck.test(id)) {
    let aifleet = aiSetup.validAiFleet(fleet);
    aifleet['AI']['targets'] = [];
    Object.assign(db.tempdb[id], aifleet);

    if (randomCheck.test(id)) {
      let dice = Math.random();
      let aiCoords = getPlayerCoords(1);
      let player1Coords = getPlayerCoords(0);
      if (dice < 0.5) {
        res.redirect('interc');
        return;
      } else {
        let aiShot = randomShot(aiCoords['targets']);

        let isHit = checkCoords(aiShot, player1Coords);

        if (isHit) {
          aiCoords['targets'].push('X' + aiShot);
          destroyShip(aiShot, player1Coords);

        } else {
          aiCoords['targets'].push(aiShot);
        }
        res.redirect('interc');
        return
      }
    }

    res.redirect('interc');
    return;
  }
  res.redirect('newp2');

});

// posts player twos ships to server, initializes the pass screen
app.post('/addPlayerTwo', (req, res) => {
  let randomCheck = new RegExp('R', 'g')
  let name = req.body.name;
  let form = req.body;
  let coords = filterName(form);
  let check = Object.keys(coords);
  if (check.length !== 17) {
    res.redirect('/new');
    return;
  }
  if (name === '') {
    res.redirect('/new');
  }


  let id = getGameId(db.tempdb);
  let player2 = new Player(name, coords);
  db.tempdb[id][player2.name] = player2.ships;
  db.tempdb[id][player2.name]['targets'] = [];

  if (randomCheck.test(id)) {
    let dice = Math.random();
    if (dice < 0.5) {
      res.redirect('inter1')
      return;
    } else {
      res.redirect('inter2')
      return;
    }
  }
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


app.get('/interc', (req, res) => {
  let playerVictoryRegex = new RegExp('Victory!,', 'g');
  let aiVictoryRegex = new RegExp('Victory!$', 'g');
  let playerShot = evaluator(0, 1)
  let aiShot = evaluator(1, 0)
  let logItem = playerShot + ', ' + aiShot
  let templateVars = {
    logItem: logItem,
    player: 'player',
    url: '/player1turn'
  };
  if (playerVictoryRegex.test(logItem)) {
    res.redirect('/victory1')
    return
  }

  if (aiVictoryRegex.test(logItem)) {
    rest.redirect('/victory2');
    return;
  }


  res.render('inter', templateVars);
});



app.post('/interc', (req, res) => {
  let player1Coords = getPlayerCoords(0);
  let aiCoords = getPlayerCoords(1);

  let shot = req.body.coord;
  if (typeof shot === 'undefined') {
    res.redirect('/player1turn')
    return
  }
  let isAiHit = checkCoords(shot, aiCoords);
  if (isAiHit) {
    player1Coords['targets'].push('X' + shot);
    destroyShip(shot, aiCoords);

  } else {
    player1Coords['targets'].push(shot);
  }

  let aiShot = randomShot(aiCoords['targets']);

  let isHit = checkCoords(aiShot, player1Coords);

  if (isHit) {
    aiCoords['targets'].push('X' + aiShot);
    destroyShip(aiShot, player1Coords);

  } else {
    aiCoords['targets'].push(aiShot);
  }

  res.redirect('interc');
});


// pass screen between player two and player one
app.get('/inter1', (req, res) => {
  let victoryRegex = new RegExp('^ Congratz');
  let logItem = evaluator(1, 0);
  let templateVars = {
    player: 'player1',
    url: '/player1turn',
    logItem: logItem
  };
  if (victoryRegex.test(logItem[logItem.length - 1])) {
    res.redirect('/victory2')
    return
  }
  res.render('inter', templateVars);
});

app.post('/inter1', (req, res) => {
  let player1Coords = getPlayerCoords(0);
  let player2Coords = getPlayerCoords(1);
  let shot = req.body.coord;
  if (typeof shot === 'undefined') {
    res.redirect('/player2turn');
    return;
  }
  let isHit = checkCoords(shot, player1Coords);
  if (isHit) {
    player2Coords['targets'].push('X' + shot);
    destroyShip(shot, player1Coords);

  } else {
    player2Coords['targets'].push(shot);
  }

  res.redirect('inter1');
});

// posts player ones move to server
app.post('/player1turn', (req, res) => {
  let id = getGameId(db.tempdb);

  res.redirect('player1turn');
});


app.get('/player1turn', (req, res) => {
  //grab player ones, ship coordinates
  let singleCheck = new RegExp('S')
  let id = getGameId(db.tempdb);
  let name = Object.keys(db.tempdb[id])[0];
  let player1Coords = db.tempdb[id][name];
  let player2PrevShots = getPlayerCoords(1)['targets']
  let url;
  if (singleCheck.test(id)) {
    url = '/interc';
  } else {
    url = '/inter2';
  }

  let templateVars = {
    player: 'player 1',
    url: url,
    ships: player1Coords,
    otherShots: player2PrevShots
  };
  res.render('player1turn', templateVars);
});

app.post('/inter2', (req, res) => {
  let player1Coords = getPlayerCoords(0);
  let player2Coords = getPlayerCoords(1);
  let shot = req.body.coord;
  if (typeof shot === 'undefined') {
    res.redirect('/player1turn');
    return;
  }

  let isHit = checkCoords(shot, player2Coords);
  if (isHit) {
    player1Coords['targets'].push('X' + shot);
    destroyShip(shot, player2Coords);
  } else {
    player1Coords['targets'].push(shot);
  }

  res.redirect('inter2');
});

app.get('/inter2', (req, res) => {
  let victoryRegex = new RegExp('^ Congratz')
  let logItem = evaluator(0, 1);
  let templateVars = {
    player: 'player 2',
    url: '/player2turn',
    logItem: logItem
  };
  if (victoryRegex.test(logItem[logItem.length - 1])) {
    res.redirect('/victory1');
    return
  }
  res.render('inter2', templateVars);
});

app.post('/player2turn', (req, res) => {
  res.render('player2turn');
});

app.get('/player2turn', (req, res) => {
  let id = getGameId(db.tempdb);
  let name = Object.keys(db.tempdb[id])[1];
  let player2Coords = db.tempdb[id][name];
  let player1PrevShots = getPlayerCoords(0)['targets']
  let templateVars = {
    player: 'player 2',
    url: '/inter1',
    ships: player2Coords,
    otherShots: player1PrevShots
  };
  res.render('player2turn', templateVars);
});

app.get('/victory1', (req, res) => {
  let id = getGameId(db.tempdb);
  let name = Object.keys(db.tempdb[id])[0];
  let templateVars = { name: name }
  db.tempdb[id]['win'] = name;
  console.log(db.tempdb)
  res.render('victory', templateVars);
})

app.get('/victory2', (req, res) => {
  let id = getGameId(db.tempdb);
  let name = Object.keys(db.tempdb[id])[1];
  db.tempdb[id]['win'] = name;
  console.log(db.tempdb)
  let templateVars = { name: name }
  res.render('victory', templateVars);
})

app.listen(8080);

console.log('listening on port 8080');
