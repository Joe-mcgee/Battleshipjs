
$(document).ready(function() {
  let newGame = $('<div/>', {
    'id': 'newGame'
  });

  $(newGame).css({ 'grid-column': '1', 'display': 'grid', 'grid-template-rows': '1fr 1fr' });
  let newButton = $('<button/>', {
    'id': 'new'
  });

  $(newButton).css({'grid-row': '1', 'height': '100%', 'width': '100%', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center'});
  newButton.append(document.createTextNode('New Game'));
  newGame.append(newButton);

  $('.main-box').append(newGame);

  let options = $('<div/>', {
    'id': 'options'
  });
  $(options).css({'grid-row': '2', 'display': 'grid', 'grid-template-rows': '1fr 1fr'});

  let players = $('<select/>', {
    'id': 'players'
  });
  let single = $('<option/>', {
    'value': 'Single'
  });
  single.append(document.createTextNode('Single Player vs Computer'));
  let two = $('<option/>', {
    'value': 'Two Player'
  });
  two.append(document.createTextNode('2P single Computer'));
  let remote = $('<option/>', {
    'value': 'Remote'
  });
  remote.append(document.createTextNode('2P two Computer'));
  $(players).append(single)
  $(players).append(two);
  $(players).append(remote)
  $(options).append(players)
  $(newGame).append(options)
});



$(document).ready(function() {
  console.log('working')
})
