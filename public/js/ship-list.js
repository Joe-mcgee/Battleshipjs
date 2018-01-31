const SHIPNAMES = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer']

function draw shipList(fleet) {
  let isHit = new RegExp('^X')
  let list = $('<section/>', {
    'class': 'ship-list'
  })
  $(list).css({'display':'grid', 'grid-template-rows':'1'})
  $(list).css('height', function() {
    var height = $(window).width() / 2;
    var cell = height / 11;
    return cell;
  })

  fleet.forEach((ship, i) => {
    let label = $('<p/>', {
    'class':'label',
  })
  $(label).append(document.createTextNode(SHIPNAMES[i]))
  $(list).append(label)
    ship.forEach((coord) => {
      let cell = $('<div/>', {

      })

      if(isHit.test(coord)) {

      }
    })

  });

}



$(document).ready(function() {

})
