$(document).ready( function () {
  $('.main-box').append(drawBoard());
});

$(document).ready( function () {
  $('.main-box').append(allocShips());
});

let submitButton = $('<input/>', {
  'type': 'submit',
  'form': 'boardForm',
  'value': 'submit'
});
$(submitButton).attr('form', 'boardForm')
$(submitButton).append(document.createTextNode('confirm placement'))
$(document).ready( function () {
  $('.main-box').append(submitButton)
})




