// functions for ships
// defines length of cell
function celldim() {
  var width = $(window).width() / 2;
  var cell = width / 11;
  return cell;
}


function Ship(type, size) {
  this.type = type;
  this.size = size;
  this.health = size;
  this.location = [];
  this.orientation = 'H';
}

var carrier = new Ship('Carrier', 5);
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

  $(shipYard).css({ 'grid-column': '2', 'width': '100%', 'height': '100%', 'display': 'grid', 'grid-template-rows': '1fr 1fr', 'grid-template-columns': '2' });
  //nest for instruction for player
  let instructions = $('<div/>', {
    'id': 'instructions'
  });
  let instrutTitle = $('<h1/>', {
    'id': 'instructT'
  });
  $(instrutTitle).append(document.createTextNode('Please deploy your fleet, Player 1'));
  $(instructions).append(instrutTitle);
  $(instructions).css({ 'grid-row': '2', 'grid-column': '1/2', 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' });
  $(shipYard).append(instructions);

  //ships
  let yard = $('<div/>', {
    'id': 'yard'
  });
  $(yard).css({ 'grid-row': '1', 'display': 'grid'});
  $(yard).css('grid-template-columns', function() {
    var length1 = celldim() * 6;
    var length2 = celldim() * 5;
    var string = length1 + 'px ' + length2 + 'px';
    return string;
  });

  $(yard).css('grid-row-gap', function() {
    return celldim();
  });
  $(yard).css('grid-template-rows', function() {
    var string = 'repeat(' + Math.ceil(fleet.length / 2) + ', ' + celldim() + 'px)';
    return string;
  });
  let iter = [1, 1, 2, 2, 3];
  let j = 0;
  for (ship of fleet) {
    let image = $('<div/>', {
      'id': ship.type,
      'class': 'ship ui-droppable-carrier'
    });

    $(image).draggable({
      grid: [celldim(), celldim()]
    });



    $(image).css({'display': 'grid' });
    $(image).css('grid-template-columns', function() {
      var string = 'repeat(' + ship.size + ', 1fr)';
      return string;
    });

    for (var i = 0; i < ship.size; i++) {
      let databox = $('<div/>', {
        'class': 'xy'
      });
      $(databox).css({ 'height': 'calc(100% - 2px)', 'width': 'calc(100% - 2px)', 'border': '1px solid black', 'background-color': 'white', 'display': 'flex', 'justify-content': 'center', 'align-items':'center' });
      $(databox).css('grid-column', function() {
        return i + 1;
      });
      $(image).append(databox);
    }

    $(image).css('grid-row', function() {
      return iter[j];
    });
    /*$(image).css('grid-column', function() {
      if ((j + 1) % 2 === 0) {
        return '2';
      } else {
        return '1';
      }
    });*/
    $(image).css('width', function() {
      return celldim() * ship.size;
    });
    $(image).css('height', function() {
      return celldim();
    });
    $(image).click(function() {

      let oldRow = $(image).css('grid-template-rows');
      let oldCol = $(image).css('grid-template-columns');
      let oldHeight = $(image).css('height');
      let oldWidth = $(image).css('width');

      $(image).css({'grid-template-rows': oldCol, 'grid-template-columns': oldRow, 'height': oldWidth, 'width': oldHeight });



      /*$(image).draggable({
      grid: [celldim(), celldim()]
    });*/
    });

    ship['image'] = image;
    $(yard).append(image);
    $(shipYard).append(yard);
    j++;
  }

  return shipYard;
}



