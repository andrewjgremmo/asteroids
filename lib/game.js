(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.DIM_X = 800;
  Asteroids.DIM_Y = 500;
  Asteroids.NUM_ASTEROIDS = 10;

  var Game =  Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids(Asteroids.NUM_ASTEROIDS);
    var game = this;
    this.bullets = [];

    this.ship = new Asteroids.Ship({
            pos: game.randomShipPosition(),
            vel: [0,0],
            color: Asteroids.Ship.COLOR,
            radius: Asteroids.Ship.RADIUS,
            game: game
    });

    this.backgroundImage = new Image();
    this.backgroundImage.src = "images/background.png";
  };

  Game.prototype.allObjects = function(){
    var objectsArray = [];
    objectsArray = objectsArray.concat(this.asteroids);
    objectsArray = objectsArray.concat(this.bullets);
    objectsArray.push(this.ship);
    return objectsArray;
  };

  Game.prototype.randomShipPosition = function(){
    x = Math.floor(Asteroids.DIM_X*Math.random());
    y = Math.floor(Asteroids.DIM_Y*Math.random());
    return [x,y];
  };

  Game.prototype.randomAsteroidPosition = function(){
    var x, y;
    if (Math.random() > 0.5) {
      x = Math.floor(Asteroids.DIM_X*Math.random());
      y = 0;
    } else {
      x = 0;
      y = Math.floor(Asteroids.DIM_Y*Math.random());
    }
    
    return [x,y];
  };

  Game.prototype.addAsteroid = function () {
    var pos = this.randomAsteroidPosition();
    var asteroid = new Asteroids.Asteroid({pos: pos, game: this});
    this.asteroids.push(asteroid);
  };

  Game.prototype.addAsteroids = function(number){
    for (var i = 0; i < number; i++){
      this.addAsteroid();
    }
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);

    ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      960,
      640,
      0,
      0,
      Asteroids.DIM_X,
      Asteroids.DIM_Y
    );

    var objects = this.allObjects();
    objects.forEach (function (object) {
      object.draw(ctx);
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
    if (pos[0] > Asteroids.DIM_X + Asteroids.Asteroid.RADIUS) {
      new_pos[0] -= Asteroids.DIM_X + Asteroids.Asteroid.RADIUS;
    } else if (pos[0] < 0 - Asteroids.Asteroid.RADIUS) {
      new_pos[0] += Asteroids.DIM_X + Asteroids.Asteroid.RADIUS;
    } else if (pos[1] < 0 - Asteroids.Asteroid.RADIUS) {
      new_pos[1] += Asteroids.DIM_Y + Asteroids.Asteroid.RADIUS;
    } else if (pos[1] > Asteroids.DIM_Y + Asteroids.Asteroid.RADIUS) {
      new_pos[1] -= Asteroids.DIM_Y + Asteroids.Asteroid.RADIUS;
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
      this.addAsteroid();
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
