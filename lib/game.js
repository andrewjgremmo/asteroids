(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.DIM_X = 900;
  Asteroids.DIM_Y = 500;
  Asteroids.NUM_ASTEROIDS = 4;

  var Game =  Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids(Asteroids.NUM_ASTEROIDS, Asteroids.Asteroid.RADIUS);
    this.bullets = [];
    this.destroyedAsteroids = 0;
    var game = this;

    this.ship = new Asteroids.Ship({
            pos: game.randomShipPosition(),
            vel: [0,0],
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

  Game.prototype.addAsteroid = function (radius, pos) {
    var new_pos = pos || this.randomAsteroidPosition();
    var asteroid = new Asteroids.Asteroid({
      pos: new_pos, 
      game: this,
      radius: radius
    });
    this.asteroids.push(asteroid);
  };

  Game.prototype.addAsteroids = function(number, radius, pos){
    for (var i = 0; i < number; i++){
      this.addAsteroid(radius, pos);
    }
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);

    ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      960,
      640
    );

    var objects = this.allObjects();
    objects.forEach (function (object) {
      ctx.save();
      object.draw(ctx);
      ctx.restore();
    });
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    objects.forEach (function(object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos, obj) {
    var new_pos = pos.slice();
    if (pos[0] > Asteroids.DIM_X + obj.radius * 2) {
      new_pos[0] -= Asteroids.DIM_X + obj.radius * 2;
    } else if (pos[0] < 0 - obj.radius * 2) {
      new_pos[0] += Asteroids.DIM_X + obj.radius * 2;
    } else if (pos[1] < 0 - obj.radius) {
      new_pos[1] += Asteroids.DIM_Y + obj.radius;
    } else if (pos[1] > Asteroids.DIM_Y + obj.radius) {
      new_pos[1] -= Asteroids.DIM_Y + obj.radius;
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
    if (this.asteroids.length < Asteroids.NUM_ASTEROIDS) {
      this.addAsteroid(Asteroids.Asteroid.RADIUS);
    }
    // var game = this;
    if (!(this.enemyShip) &&
        this.destroyedAsteroids % 10 === 0 && 
        this.destroyedAsteroids > 0) {
          this.enemyShip = new Asteroids.EnemyShip({
                pos: this.randomAsteroidPosition(),
                vel: [2,2],
                game: this,
                player: this.ship
          });
          this.asteroids.push(this.enemyShip);
    }

    if (!(this.mirrorShip) &&
        this.destroyedAsteroids % 10 === 0 && 
        this.destroyedAsteroids > 0) {
          this.mirrorShip = new Asteroids.MirrorShip({
                pos: [-this.ship.pos[0], this.ship.pos[1]],
                vel: this.ship.vel,
                game: this,
                player: this.ship
          });
          console.log("spawning a mirror ship", this.mirrorShip);
          this.asteroids.push(this.mirrorShip);
    }

    if (this.mirrorShip) {
      this.mirrorShip.move();
    }

    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (obj) {
    var idx;
    if (obj instanceof Asteroids.Asteroid || 
        obj instanceof Asteroids.EnemyShip ||
        obj instanceof Asteroids.MirrorShip
    ) {
      idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    }
  };
})();
