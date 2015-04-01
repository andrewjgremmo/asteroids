# asteroids.js
A browser based version of the arcade classic.

### [Live Link](http://andrewjgremmo.github.io/asteroids)

## Features

* Keeps track of score and lives
* Multiple enemy types
    * Asteroid
    * UFO that fires at player's current position
    * Mirror Ship that mimics player's movements on with inverted X axis
* High Score Board (displays top 10 scores) (utilizes [Parse](https://www.parse.com/) to store scores)

## Technical Details
* Written in JavaScript, using HTML5 Canvas API
* Implements an inherits function to allow for inheritance design pattern
* Uses JavaScript's Math object to use vector algebra to calculate object movement, momentum and UFO attacks
* Uses JavaScript's Math object to use trigonometry to calculate rotation of ship