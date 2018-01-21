
$(document).ready(function() {
  let newGame = $('<div/>', {
    'id': 'newGame'
  });
  $(newGame).css({ 'grid-column': '1', 'display': 'grid', 'grid-template-rows': '1fr 1fr' });
  let newButton = $('<button/>', {
    'id': 'new'
  });
  $(newButton).css({'grid-row': '1', 'height':'100%', 'width':'100%', 'display':'flex', 'align-items':'center', 'justify-content':'center'});
  newButton.append(document.createTextNode('New Game'))
  newGame.append(newButton);

  $('.main-box').append(newGame);
});



$(document).ready(function() {
  console.log('working')
})
