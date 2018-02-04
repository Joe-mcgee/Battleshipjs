/*****************************************************************
*
* JS for Drawing the ship allocation and the ship placement board
*
*****************************************************************/

$(document).ready( function () {
  $('.main-box').append(drawBoard('init'));
});

$(document).ready( function () {
  $('.main-box').append(allocShips());
});

