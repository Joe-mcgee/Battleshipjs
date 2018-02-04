/***************************************************
 *
 * JS for handling the display of relevant gameboards
 *
 ***************************************************/

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// coordinates for each cell are handled in the divs class
// this function takes a div and returns its coordinates in an array
function divcoords(div) {
  let coords = $(div).attr('class').match(/([A-Z]-10|[A-Z]-[1-9])/)[0];
  let x = coords.split('-')[0].toLowerCase().charCodeAt(0) - 96;
  let y = Number(coords.split('-')[1]);
  return [x, y];
}

// the X axis is handled with letters in BS
// this function will take to numerical values and convert the X to a letter
function coordsToDiv(coords) {
  let x = coords[0];
  let y = coords[1];
  let letter = String.fromCharCode(96 + x).toUpperCase();
  let linkToGrid = '.' + letter + '-' + y;
  let div = $(linkToGrid);
  return div;
}

// handles the drawing of the x axis
function xaxis(board, letters) {
  letters.forEach(function(letter, i) {
    var letterdiv = $('<div/>', {
      'class': letter
    });

    var letterNode = document.createTextNode(letter);
    $(letterdiv).append(letterNode);

    $(letterdiv).css({ 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'grid-row': '1', 'border-bottom': '1px solid black', 'border-right': '1px solid black' });
    $(letterdiv).css('grid-column', function() {
      var column = (i + 2).toString();
      return column;
    });

    $(board).append(letterdiv);
  });
}

function yaxis(board, numbers) {
  numbers.forEach(function(number, i) {
    var numberdiv = $('<div/>', {
      'class': number
    });
    var numberNode = document.createTextNode(number);
    $(numberdiv).append(numberNode);
    $(numberdiv).css({ 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'grid-column': '1', 'border-bottom': '1px solid black', 'border-right': '1px solid black' });
    $(numberdiv).css('grid-row', function() {
      var row = (i + 2).toString();
      return row;
    });
    $(board).append(numberdiv);

  });
}

// Fills the top left most grid square
function origin(board) {
  var origin = $('<div/>', {
    'class': 'origin'
  });
  $(origin).css({ 'height': '100%', 'width': '100%', 'border-right': '1px solid black', 'border-bottom': '1px solid black', 'grid-row': '1', 'grid-column': '1' });
  $(board).append(origin);
}

// checks for loaded scripts
// https://stackoverflow.com/questions/9659265/check-if-javascript-script-exists-on-page
function isScriptLoaded(url) {
  let scripts = document.getElementsByTagName('script');
  for (let i = scripts.length; i--;) {
    if (scripts[i].src === url) { return true; }
  }
  return false;
}

/***********************************************************************
 *
 * JS for each Board State; Ship placement, Firing grid, and status grid.
 *
 ***********************************************************************/

// handles grid that allows ships to be placed on it
function drawGridWithDrop(board, numbers, letters) {
  numbersArray = numbers.map(Number);
  numbersArray.forEach(function(y) {
    numbersArray.forEach(function(x) {
      var reference = [x, y];
      var cell = $('<select/>', {
        'name': letters[y - 1] + '-' + x,
        'class': letters[y - 1] + '-' + x
      });

      if (isScriptLoaded("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js")) {
        // code that handles events for when a particular ship is dropped on board
        $(cell).droppable({

          drop: function(event, ui) {

            if (!ui.draggable.hasClass('ui-draggable')) { return; }
            /*$(this).append("<div id='marked'>Test</div>")*/
            let baseMarker;
            let coords;
            let height;
            let width;
            let x;
            let y;
            let location;
            if (ui.draggable.is('#Carrier')) {
              baseMarker = $(this);
              console.log(baseMarker);
              coords = divcoords(baseMarker);
              let carrier = document.getElementById('Carrier');
              height = carrier.clientHeight;
              width = carrier.clientWidth;

              x = coords[0];
              y = coords[1];
              console.log(y);
              location = [];
              if (height > width) {
                location = [
                  [x, y + 1],
                  [x, y + 2],
                  coords, [x, y - 1],
                  [x, y - 2]
                ];
              } else {
                location = [
                  [x + 1, y],
                  [x + 2, y],
                  coords, [x - 1, y],
                  [x - 2, y]
                ];
              }
              location.forEach((spot) => {
                var spotdiv = coordsToDiv(spot);
                $(spotdiv).append("<option class='Carrier-mark' value='Carrier-mark'>Carrier Mark</div>");
              });
            } else if (ui.draggable.is('#Battleship')) {
              baseMarker = $(this);
              coords = divcoords(baseMarker);

              let battleship = document.getElementById('Battleship');
              height = battleship.clientHeight;
              width = battleship.clientWidth;
              x = coords[0];
              y = coords[1];
              location = [];
              if (height > width) {
                location = [
                  coords, [x, y - 1],
                  [x, y + 2],
                  [x, y + 1]
                ];
              } else {
                location = [
                  [x + 1, y],
                  [x + 2, y],
                  coords, [x - 1, y]
                ];
              }
              location.forEach((spot) => {
                let spotdiv = coordsToDiv(spot);
                $(spotdiv).append("<option class='Battleship-mark' value='Battleship-mark'>Battleship Mark</div>");
              });
              let marker = coordsToDiv(coords);
            } else if (ui.draggable.is('#Submarine')) {
              baseMarker = $(this);
              coords = divcoords(baseMarker);

              let submarine = document.getElementById('Submarine');
              height = submarine.clientHeight;
              width = submarine.clientWidth;
              x = coords[0];
              y = coords[1];
              location = [];
              if (height > width) {
                location = [
                  coords, [x, y - 1],
                  [x, y + 1]
                ];
              } else {
                location = [
                  [x + 1, y],
                  coords, [x - 1, y]
                ];
              }
              location.forEach((spot) => {
                let spotdiv = coordsToDiv(spot);
                $(spotdiv).append("<option class='Submarine-mark' value='Submarine-mark'>Submarine mark</div>");
              });
              let marker = coordsToDiv(coords);
            } else if (ui.draggable.is('#Cruiser')) {
              baseMarker = $(this);
              coords = divcoords(baseMarker);

              let cruiser = document.getElementById('Cruiser');
              height = cruiser.clientHeight;
              width = cruiser.clientWidth;
              x = coords[0];
              y = coords[1];
              location = [];
              if (height > width) {
                location = [
                  coords, [x, y - 1],
                  [x, y + 1]
                ];
              } else {
                location = [
                  [x + 1, y],
                  coords, [x - 1, y]
                ];
              }
              location.forEach((spot) => {
                let spotdiv = coordsToDiv(spot);
                $(spotdiv).append("<option class='Cruiser-mark' value='Cruiser-mark'>Cruiser mark</div>");
              });
              let marker = coordsToDiv(coords);
            } else if (ui.draggable.is('#Destroyer')) {
              baseMarker = $(this);
              coords = divcoords(baseMarker);

              let destroyer = document.getElementById('Destroyer');
              height = destroyer.clientHeight;
              width = destroyer.clientWidth;
              x = coords[0];
              y = coords[1];
              location = [];
              if (height > width) {
                location = [
                  coords, [x, y + 1]
                ];
              } else {
                location = [
                  [x + 1, y],
                  coords
                ];
              }
              location.forEach((spot) => {
                let spotdiv = coordsToDiv(spot);
                $(spotdiv).append("<option class='Destroyer-mark' value='Destroyer-mark'>Destroyer mark</div>");
              });
              let marker = coordsToDiv(coords);
            }

          },
          // handles the change in ship placement in the event a player changes their mind on ship location
          over: function(event, ui) {
            if (ui.draggable.is('#Carrier')) {
              $('.board').find('.Carrier-mark').remove();
            } else if (ui.draggable.is('#Battleship')) {
              $('.board').find('.Battleship-mark').remove();
            } else if (ui.draggable.is('#Submarine')) {
              $('.board').find('.Submarine-mark').remove();
            } else if (ui.draggable.is('#Cruiser')) {
              $('.board').find('.Cruiser-mark').remove();
            } else if (ui.draggable.is('#Destroyer')) {
              $('.board').find('.Destroyer-mark').remove();
            }
          }
        });
      }
      $(cell).css({ 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'border-bottom': '1px solid black', 'border-right': '1px solid black' });
      $(cell).css('grid-column', function() {
        var column = (y + 1).toString();
        return column;
      });

      $(cell).css('grid-row', function() {
        var row = (x + 1).toString();
        return row;
      });
      $(board).append(cell);
    });
  });
}
// handles displaying the grid for the current players' ships
function displayGrid(board, numbers, letters) {
  numbersArray = numbers.map(Number);
  numbersArray.forEach(function(y) {
    numbersArray.forEach(function(x) {
      var reference = [x, y];
      let cell = $('<div/>', {
        'name': letters[y - 1] + '-' + x,
        'class': letters[y - 1] + '-' + x
      });
      $(cell).css({ 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'border-bottom': '1px solid black', 'border-right': '1px solid black' });
      $(cell).css('grid-column', function() {
        var column = (y + 1).toString();
        return column;
      });

      $(cell).css('grid-row', function() {
        var row = (x + 1).toString();
        return row;
      });
      // if a player has a hit ship, it will display a red background
      fleet.forEach((ship) => {
        ship.forEach((coord) => {
          if (coord === $(cell).attr('class')) {
            $(cell).css({ 'background-color': 'white' });
          }
          if (coord === 'X' + $(cell).attr('class')) {
            $(cell).css({ 'background-color': 'red' });
            previousTargets = previousTargets.filter(item => item !== coord);
          }
        });
      });
      // coordinates the the opponent has attacked will display as black
      otherShots.forEach((target) => {
        if (target === $(cell).attr('class')) {
          $(cell).css({ 'background-color': 'black' });
        }
      });
      $(board).append(cell);
    });
  });
}

// displays the grid a player will use to choose where to fire
function fireGrid(board, numbers, letters) {
  numbersArray = numbers.map(Number);
  numbersArray.forEach(function(y) {
    numbersArray.forEach(function(x) {
      var reference = [x, y];
      var cell = $('<input/>', {
        'type': 'radio',
        'name': 'coord',
        'class': letters[y - 1] + '-' + x,
        'value': letters[y - 1] + '-' + x
      });
      $(cell).css({ 'height': '99%', 'width': '99%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'border-bottom': '1px solid black', 'border-right': '1px solid black' });
      $(cell).css('grid-column', function() {
        var column = (y + 1).toString();
        return column;
      });

      $(cell).css('grid-row', function() {
        var row = (x + 1).toString();
        return row;
      });
      // if a player has shot at a target before, it will become disabled
      previousTargets.forEach((target) => {
        if (target == $(cell).attr('class')) {
          $(cell).attr('disabled', true);
          $(cell).css({ 'visibility': 'hidden' });
        }
        // hits are disabled and red
        if (target == 'X' + $(cell).attr('class')) {
          cell = $('<div/>', {
            'class': letters[y - 1] + '-' + x
          });
          $(cell).css({ 'background': 'red', 'width': '100%', 'height': '100%' });
        }
      });
      $(board).append(cell);
    });
  });
}

// function handles fiting the board components together based on the desired mode
function drawBoard(mode) {
  var board = $('<div/>', {
    'class': 'board'
  });
  $(board).css({ 'display': 'grid' });
  $(board).css('grid-template-columns', function() {
    var height = $(window).width() / 2;
    var cell = height / 11;
    var string = 'repeat(11, ' + cell + 'px)';
    return string;
  });
  $(board).css('grid-template-rows', function() {
    var width = $(window).width() / 2;
    var cell = width / 11;
    var string = 'repeat(11, ' + cell + 'px)';
    return string;
  });
  // fire grids need a form to post the desired coordinate to attack
  let form;
  if (mode === 'fire') {
    form = $('<form/>', {
      'action': formUrl,
      'method': 'POST',
      'id': 'fire'
    });
    $(form).append(board);
  }

  if (mode === 'fire2') {
    form = $('<form/>', {
      'action': '/inter1',
      'method': 'POST',
      'id': 'fire'
    });
    $(form).append(board);
  }

  origin(board);
  xaxis(board, letters);
  yaxis(board, numbers);
  switch (mode) {
  case 'init':
    drawGridWithDrop(board, numbers, letters);
    break;
  case 'display':
    displayGrid(board, numbers, letters);
    break;
  case 'fire':
  case 'fire2':
    fireGrid(board, numbers, letters);
    return form;
  }
  return board;
}
