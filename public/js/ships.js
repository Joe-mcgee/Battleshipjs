// functions for ships
// defines length of cell
function cell() {
  var width = $(window).width();
  var cell = width / 11;
  return cell;
}

function Ship (type, size) {
  this.type = type;
  this.size = size;
  this.health = size;
  this.location = [];
  this.orientation = 'H';
};

var carrier = new Ship('Carrier', 5)
var battleship = new Ship('Battleship', 4);
var cruiser = new Ship('Cruiser', 3);
var submarine = new Ship('Submarine', 3);
var destroyer = new Ship('Destroyer', 2);

let fleet = [carrier, battleship, cruiser, submarine, destroyer];



function allocShips() {
  //right side of screen
  let shipYard = $('<div/>', {
    'id': 'shipyard'
  });

  $(shipYard).css({ 'grid-column': '2', 'width': '100%', 'height': '100%', 'display': 'grid', 'grid-template-rows': '0.5fr 1fr' });
  //nest for instruction for player
  let instructions = $('<div/>', {
    'id': 'instructions'
  });
  let instrutTitle = $('<h1/>', {
    'id': 'instructT'
  });
  $(instrutTitle).append(document.createTextNode('Please deploy your fleet, Player 1'));
  $(instructions).append(instrutTitle);
  $(instructions).css({'grid-row': '1', 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' });
  $(shipYard).append(instructions)

  //ships
  let yard = $('<div/>', {
    'id': 'yard'
  });

  for (ship of fleet) {
    console.log(ship)
  }




  return shipYard;
}

