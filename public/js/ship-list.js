/*************************************************************
*
* JS for handling the display of the ship list for each player
*
*************************************************************/
const SHIPNAMES = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];

function shipList(fleet) {
  let isHit = new RegExp('^X');
  let list = $('<section/>', {
    'class': 'ship-list'
  });
  $(list).css({ 'background-color': 'cadetblue' });

  fleet.forEach((ship, i) => {
    let label = $('<p/>', {
      'class': 'label'
    });

    $(label).append(document.createTextNode(SHIPNAMES[i]));
    $(list).append(label);

    ship.forEach((coord) => {
      let cell = $('<div/>', {
        'class': 'cellLog'
      });
      $(cell).css('width', function() {
        var height = $(window).width() / 2;
        var cell = height / 11;
        return cell;
      });
      $(cell).css('height', function() {
        var height = $(window).width() / 2;
        var cell = height / 11;
        return cell;
      });

      if (isHit.test(coord)) {
        $(cell).css({ 'background-color': 'red' });
      } else {
        $(cell).css({ 'background-color': 'white' });
      }
      $(label).append(cell);
    });
    $(list).append(label);

  });
  return list;
}

$(document).ready(function() {
  $('body').append(shipList(fleet));
});
