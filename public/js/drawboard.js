const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
      console.log(column);
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
      console.log(row);
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
  numbersArray.forEach(function(x) {
    numbersArray.forEach(function(y) {
      var reference = [x, y];
      var cell = $('<div/>', {
        'class': x + '-' + letters[y - 1]
      });
      $(cell).css({ 'height': '100%', 'width': '100%', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'border-bottom': '1px solid black', 'border-right': '1px solid black' });
      $(cell).css('grid-column', function() {
        var column = (y + 1).toString();
        console.log(column);
        return column;
      });

      $(cell).css('grid-row', function() {
        var row = (x + 1).toString();
        console.log(row);
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
  console.log('hmmmm');
  $(board).css({ 'display': 'grid', 'grid-template-columns': 'repeat(11, 1fr)' });
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
