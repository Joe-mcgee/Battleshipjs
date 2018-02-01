
const fleet = [{ 'Carrier': 5 },
  { 'Battleship': 4 },
  { 'Submarine': 3 },
  { 'Cruiser': 3 },
  { 'Destroyer': 2 }
];

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(one, two) {
  min = Math.ceil(one);
  max = Math.floor(two);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function orientation() {
  let options = ['H', 'V'];
  let roll = getRandomIntInclusive(0, 1);
  return options[roll]
}

function baseCoord(orient, length) {
  let x;
  let y;
  let colnum;
  let row;
  switch (orient) {
  case 'H':
    x = 10 - length;
    y = 10;
    col = getRandomIntInclusive(1, x);
    row = getRandomIntInclusive(1, y);
    break;
  case 'V':
    x = 10;
    y = 10 - length;
    col = getRandomIntInclusive(1, x);
    row = getRandomIntInclusive(1, y);
    break;

  }
  return col + '-' + row;
}

function coordArray(base, length, orient) {
  let rowreg = new RegExp('(10$|[0-9]$)')
  let output = [];

  let col = base[0];
  let row = rowreg.exec(base)[0]
  console.log(row)
  output.push(letters[col - 1] + '-' + row);
  let iter = 1;
  switch (orient) {
  case 'H':
    while (iter < length) {
      let x = Number(col) + iter;
      let y = row;
      output.push(letters[x - 1] + '-' + y);
      iter++;
    }
    break;
  case 'V':
    while (iter < length) {
      let x = Number(col);
      let y = parseInt(row, 10) + iter;
      output.push(letters[x - 1] + '-' + y);
      iter++;
    }
  }
  return output;
}

function genAiFleet(fleet) {
  let output = {};
  let ships = {};
  fleet.forEach((ship) => {
    let length = Object.values(ship)[0];
    let name = Object.keys(ship)[0];
    let orient = orientation();
    let base = baseCoord(orient, length);
    let coords = coordArray(base, length, orient);
    ships[name] = coords;
  });
  output['AI'] = ships;
  return output;

}

let potentialFleet = genAiFleet(fleet)

function checkAiFleet(AiFleet) {
  let ships = Object.values(AiFleet)[0];
  console.log(ships)

}

checkAiFleet(potentialFleet)


function validAiFleet(AiFleet) {

}

module.exports.genAiFleet = genAiFleet;

