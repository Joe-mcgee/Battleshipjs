
/*
function shipBoard() {
  var board = $('<div/>', {
    'class': 'board'
  });
  $(board).css({ 'display': 'grid' });
  $(board).css('grid-template-columns', function() {
    var height = $(window).width() / 2;
    var cell = height / 11;
    var string = 'repeat(11, ' + cell + 'px)';
    console.log(string);
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
  displayGrid(board, numbers, letters);
  return board
}*/


$(document).ready(function() {
  $('.main-box').append(drawBoard('fire'));
  $('.main-box').append(drawBoard('display'));
});



