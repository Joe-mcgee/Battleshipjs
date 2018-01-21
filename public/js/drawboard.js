function drawBoard() {
  var board = $('<div/>', {
    'class': 'board'
  });
  console.log('hmmmm')
  $(board).css({'display': 'grid', 'grid-template-columns': 'repeat(11, 1fr)'});
  $(board).css('grid-template-rows', function() {
    var width = $(window).width() / 2;
    var cell = width / 11;
    var string = 'repeat(11, ' + cell + 'px)'
    return string
  })
  console.log(board)
  return board;
}

