(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.DIM_X = 800;
  Asteroids.DIM_Y = 600;
  Asteroids.NUM_ASTEROIDS = 10;

  var Game =  Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids(Asteroids.NUM_ASTEROIDS);
    var game = this;
    this.bullets = [];

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
    objectsArray = objectsArray.concat(this.bullets);
    objectsArray.push(this.ship);
    return objectsArray;
  };

  Game.prototype.randomPosition = function(){
    x = Math.floor(Asteroids.DIM_X*Math.random());
    y = Math.floor(Asteroids.DIM_Y*Math.random());
    return [x,y];
  };

  Game.prototype.addAsteroids = function(number){
    for (var i = 0; i < number; i++){
      var pos = this.randomPosition();
      var ast = new Asteroids.Asteroid({pos: pos, game: this});
      this.asteroids.push(ast);
    }
  };

  Game.prototype.draw = function(ctx){

    ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
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
    if (pos[0] > Asteroids.DIM_X) {
      new_pos[0] -= Asteroids.DIM_X;
    } else if (pos[0] < 0) {
      new_pos[0] += Asteroids.DIM_X;
    } else if (pos[1] < 0) {
      new_pos[1] += Asteroids.DIM_Y;
    } else if (pos[1] > Asteroids.DIM_Y) {
      new_pos[1] -= Asteroids.DIM_Y;
    }

    return new_pos;
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length - 1 ; i++){
      for (var j = i+1; j < objects.length; j++){
        if (objects[i].isCollidedWith(objects[j])){
          objects[i].collideWith(objects[j]);
          objects[j].collideWith(objects[i]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (obj) {
    var idx;
    if (obj instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }

    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

})();
