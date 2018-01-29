function displayGrid(board, numbers, letters, ships) {
  numbersArray = numbers.map(Number);
  numbersArray.forEach(function(y) {
    numbersArray.forEach(function(x) {
      var reference = [x, y];
      var cell = $('<div/>', {
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
      console.log(cell.class() === ships);

      $(board).append(cell);

    });
  });
}


$(document).ready(function() {
  console.log('check')
  $('.main-box').append(drawBoard());
 /* $('.main-box').append(displayBoard(board, numbers, letters, fleet));*/
});



