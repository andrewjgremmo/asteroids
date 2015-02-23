(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 5;

  var Game =  Asteroids.Game = function(){
    this.asteroids = []
    this.addAsteroids(NUM_ASTEROIDS);
    var game = this;

    this.ship = new Asteroids.Ship({
            pos: game.randomPosition(),
            vel: [0,0],
            color: Asteroids.Ship.COLOR,
            radius: Asteroids.Ship.RADIUS,
            game: game
    });
  };

  Game.prototype.allObjects = function(){
    var objectsArray = [];
    objectsArray = objectsArray.concat(this.asteroids);
    objectsArray.push(this.ship);
    return objectsArray;
  }

  Game.prototype.randomPosition = function(){
    x = Math.floor(DIM_X*Math.random());
    y = Math.floor(DIM_Y*Math.random());
    return [x,y];
  }

  Game.prototype.addAsteroids = function(number){
    for (var i = 0; i < number; i++){
      var pos = this.randomPosition();
      var ast = new Asteroids.Asteroid({pos: pos, game: this});
      this.asteroids.push(ast);
    };
  };

  Game.prototype.draw = function(ctx){

    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    var objects = this.allObjects();
    objects.forEach (function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    objects.forEach (function(object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var new_pos = pos.slice();
    if (pos[0] > DIM_X) {
      new_pos[0] -= DIM_X;
    } else if (pos[0] < 0) {
      new_pos[0] += DIM_X;
    } else if (pos[1] < 0) {
      new_pos[1] += DIM_Y;
    } else if (pos[1] > DIM_Y) {
      new_pos[1] -= DIM_Y;
    }

    return new_pos;
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length - 1 ; i++){
      for (var j = i+1; j < objects.length; j++){
        if (objects[i].isCollidedWith(objects[j])){
          objects[i].collideWith(objects[j]);
        }
      };
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  }

  Game.prototype.remove = function (asteroid) {
    var idx = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(idx, 1);
  }

})();
