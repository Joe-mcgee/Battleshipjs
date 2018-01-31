



function displayLog(item) {
  let box = $('<div/>', {
    'class': 'log-box'
  });

  $(box).css({ 'width': '61.8%', 'grid-column': '1/2' });
  $(box).append(document.createTextNode(item));

  return box;

}


$(document).ready(function() {
  let $item = displayLog(logItem);
  $('.main-box').append($item);
});

