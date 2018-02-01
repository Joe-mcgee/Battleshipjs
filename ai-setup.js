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
  return options[roll];
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
  let rowreg = new RegExp('(10$|[0-9]$)');
  let output = [];
  let col = base[0];
  let row = rowreg.exec(base)[0];
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

function checkAiFleet(AiFleet) {
  let ships = Object.values(AiFleet)[0];
  let coords = Object.values(ships);
  let merged = [].concat.apply([], coords);

  //https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
  const count = merged =>
    merged.reduce((a, b) =>
      Object.assign(a, {[b]: (a[b] || 0) + 1}), {});

  const duplicates = dict =>
    Object.keys(dict).filter((a) => dict[a] > 1);

  let isTrue = duplicates(count(merged));
  let pass = !((isTrue.length > 0));
  return pass;
}

function validAiFleet(fleet) {
  let potentialFleet = genAiFleet(fleet);
  let pass = checkAiFleet(potentialFleet);
  let passed = pass ? potentialFleet : validAiFleet(fleet);
  return passed;
}



module.exports.validAiFleet = validAiFleet;

