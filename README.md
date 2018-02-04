# BATTLESHIPJS
A Stretch Project for Lighthouse Labs that involves the creation of a Battleship web app.

![BSJS init SH](https://github.com/Joe-mcgee/Battleshipjs/blob/master/screenshots/init.jpg)
![BSJS screenshot](https://github.com/Joe-mcgee/Battleshipjs/blob/master/screenshots/gameplay.jpg)

## Getting Started
This project was built with
- npm
- express
- ejs
- body-parser

to install this repo on your local machine, simply clone the repo to a folder of your choice and run

`npm init`

if the command isn't found you may need to update or install npm

to initialize the server run

`node app.js` or `nodemon app.js`

opening a browser window at localhost:8080 will display the game

### How to Play
This version currently supports
- play vs a computer
- play vs a friend on same computer
- random starting player

1. Begin by selecting the game type and whether you'd like a random person to start
2. Place your ships on the board and add your alias
  - boards with ships dangling off or overlapping will fail to move to next step and reset board
  - bug fix for even sized ships being placed to far right or to far down coming soon
3. take turns destroying each others fleet by selecting coordinates to fire
  - black spots indicate misses and reds indicate hits

4. relish victory once all your opponents ships are destroyed.

### Current AI
- generates a random and unique shot.

#### Relevant Sources
[Jquery UI- draggable](http://api.jqueryui.com/draggable/)
[Jquery UI - droppable](https://jqueryui.com/droppable/)
[Jquery UI - snap to gird](https://stackoverflow.com/questions/20695744/getting-jquery-draggable-to-snap-to-specific-grid)

##### Known Bugs and Issues
- Dynamic cell size causes rounding error during ship rotation, results in evenly numbered ships to become attached to board x+1 or y+1 units from their origin
- radio buttons slightly overlow on larger window sizes, causing the display grid to slightly overlow from its parent div
- boat validation and fire validation has no error messages, just redirects.

##### Features in next version
- a Stronger Ai than current random shot model.
- gameplay on two different computers
- better css for leaderboard, submit and fire buttons
- customizations for board size, and number of ships
- legacy gameplay mode which allows more shots based on ships remaining
- supermove mode that gives diffent fire options based on ships alive.
