/*
*
* JS for in memory DB
*
*/

var tempdb = {
 '0S':
   { 'Captain Joe':
      { Carrier: [Array],
        Battleship: [Array],
        Submarine: [Array],
        Cruiser: [Array],
        Destroyer: [Array],
        targets: [Array] },
     AI:
      { Carrier: [Array],
        Battleship: [Array],
        Submarine: [Array],
        Cruiser: [Array],
        Destroyer: [Array],
        targets: [Array] },
     win: 'Captian Joe' }
    }




var logdb = {};

module.exports.tempdb = tempdb
module.exports.logdb = logdb
