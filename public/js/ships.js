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


let shipYard = $('<div/>', {

});


function allocShips() {

}
