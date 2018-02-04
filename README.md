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

1. Begin by selecting the game type and whether you'd like a random person to start
2. Place your ships on the board and add your alias
  - boards with ships dangling off or overlapping will fail to move to next step and reset board
  - bug fix for even sized ships being placed to far right or to far down coming soon
3. take turns destroying each others fleet by selecting coordinates to fire
  - black spots indicate misses and reds indicate hits

4. relish victory once all your opponents ships are destroyed.

#### Relevant Sources
http://api.jqueryui.com/draggable/
https://jqueryui.com/droppable/
https://stackoverflow.com/questions/20695744/getting-jquery-draggable-to-snap-to-specific-grid

