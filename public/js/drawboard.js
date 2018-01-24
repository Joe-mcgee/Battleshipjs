const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function divcoords(div) {
  let coords = $(div).attr('class').match(/([A-Z]-[1-9]|[A-Z]-10)/)[0];
  let x = coords.split('-')[0].toLowerCase().charCodeAt(0) - 96
  let y = Number(coords.split('-')[1]);
  return [x, y]
}

function coordsToDiv(coords) {
  let x = coords[0];
  let y = coords[1];
  let letter = String.fromCharCode(96 + x).toUpperCase()
  let linkToGrid = '.' + letter + '-' + y;
  let div = $(linkToGrid)
  return div
}



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

function origin(board) {
  var origin = $('<div/>', {
    'class': 'origin'
  });
  $(origin).css({ 'height': '100%', 'width': '100%', 'border-right': '1px solid black', 'border-bottom': '1px solid black', 'grid-row': '1', 'grid-column': '1' });
  $(board).append(origin);
}


function drawGrid(board, numbers, letters) {
  numbersArray = numbers.map(Number);
  numbersArray.forEach(function(y) {
    numbersArray.forEach(function(x) {
      var reference = [x, y];
      var cell = $('<div/>', {
        'class': letters[y - 1] + '-' + x
      });
      $(cell).droppable({

        drop: function(event, ui) {
          if (!ui.draggable.hasClass('ui-draggable')) return;
          /*$(this).append("<div id='marked'>Test</div>")*/

          if (ui.draggable.is('#Carrier')) {
            let baseMarker = $(this)
            let coords = divcoords(baseMarker)

            var carrier = document.getElementById('Carrier');
            var height = carrier.clientHeight;
            var width = carrier.clientWidth;
            if (height > width) {
              let x = coords[0];
              let y = coords[1];

              let location = [
                [x, y + 1],
                [x, y + 2],
                coords,
                [x, y - 1],
                [x, y - 2]
              ];
              location.forEach((spot) => {
                let spotdiv = coordsToDiv(spot);
                $(spotdiv).append("<div class='Carrier-mark'>Carrier Mark</div>");
              });
              let marker = coordsToDiv(coords);



              $(this).append();
            }

          }



        }

        /* over: function (event, ui) {
          $('#marked').remove()
        }
*/

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
      $(board).append(cell);
    });
  });
}



function drawBoard() {
  var board = $('<div/>', {
    'class': 'board'
  });
  $(board).css({ 'display': 'grid' });
  $(board).css('grid-template-columns', function() {
    var height = $(window).width() / 2;
    var cell = height / 11;
    var string = 'repeat(11, ' + cell + 'px)';
    console.log(string)
    return string;
  });
  $(board).css('grid-template-rows', function() {
    var width = $(window).width() / 2;
    var cell = width / 11;
    var string = 'repeat(11, ' + cell + 'px)';
    return string;
  });
  origin(board);
  xaxis(board, letters);
  yaxis(board, numbers);
  drawGrid(board, numbers, letters);


  return board;
}
