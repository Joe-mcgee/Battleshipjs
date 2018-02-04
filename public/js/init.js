/********************************
 *
 * JS for handling pregame options
 *
 ********************************/

$(document).ready(function() {
  // form for new game
  let newGame = $('<form/>', {
    'id': 'newGame',
    'action': '/new',
    'method': 'POST'
  });
  $(newGame).css({ 'display': 'grid', 'grid-template-rows': '1fr 1fr' });
  //submit button
  let newButton = $('<button/>', {
    'id': 'new',
    'type': 'submit',
    'form': 'newGame'
  });

  $(newButton).css({ 'grid-row': '1', 'height': '100%', 'width': '100%', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' });
  newButton.append(document.createTextNode('New Game'));
  newGame.append(newButton);
  $('.main-box').append(newGame);

  // divss for single or multiplayer
  let options = $('<div/>', {
    'id': 'options'
  });
  $(options).css({ 'grid-row': '2', 'display': 'grid', 'grid-template-rows': '1fr 1fr' });

  let players = $('<select/>', {
    'id': 'players',
    'name': 'gameType[]'
  });
  let single = $('<option/>', {
    'value': 'Single'
  });
  single.append(document.createTextNode('Single Player vs Computer'));
  let two = $('<option/>', {
    'value': 'Two Player'
  });
  two.append(document.createTextNode('Two Player Local'));
  let remote = $('<option disabled/>', {
    'value': 'Remote'
  });
  remote.append(document.createTextNode('*Coming Soon* Two Player Remote'));
  $(players).append(single);
  $(players).append(two);
  $(players).append(remote);
  $(options).append(players);
  $(newGame).append(options);

  $(newButton).css({ 'grid-row': '1', 'height': '100%', 'width': '100%', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' });
  newGame.append(newButton);

  // divs for random player start
  let randomDiv = $('<div/>', {
    'class': 'random'
  });

  $(randomDiv).css({ 'grid-column': '1', 'grid-row': '2' });


  let randomButton = $('<input/>', {
    'type': 'checkbox',
    'name': 'random',
    'value': 'randomStart'
  });
  $(randomButton).css({ 'height': '80%', 'width': '50%' });
  $(randomDiv).append('<span>Random Start: <span>');
  $(randomDiv).append(randomButton);
  $(options).append(randomDiv);
  $('.main-box').append(newGame);
});

$(document).ready(function() {
  console.log('working');
});
