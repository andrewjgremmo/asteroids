(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.NUM_ASTEROIDS = 4;
  Asteroids.DIM_X = window.innerWidth;
  Asteroids.DIM_Y = window.innerHeight;

  var Game =  Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids(Asteroids.NUM_ASTEROIDS, Asteroids.Asteroid.RADIUS);
    this.bullets = [];
    this.points = 0;
    this.lives = 5;
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

  //returns an array of all game objects
  Game.prototype.allObjects = function(){
    var objectsArray = [];
    objectsArray = objectsArray.concat(this.asteroids);
    objectsArray = objectsArray.concat(this.bullets);
    objectsArray.push(this.ship);
    return objectsArray;
  };

  //spawns ship in a random position on map
  Game.prototype.randomShipPosition = function(){
    x = Math.floor(Asteroids.DIM_X*Math.random());
    y = Math.floor(Asteroids.DIM_Y*Math.random());
    return [x,y];
  };

  //spawns asteroid in a random position on map boundary
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

  Game.prototype.draw = function(){
    this.ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);

    this.ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      960,
      640
    );

    var objects = this.allObjects();
    objects.forEach (function (object) {
        this.ctx.save();
        object.draw(this.ctx);
        this.ctx.restore();
    }.bind(this));

    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";
    this.ctx.font = "16px Open Sans";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Points: " + this.points + " | Lives Remaining: " + this.lives,
      Asteroids.DIM_X / 2, 
      20
    );

    Asteroids.drawId = window.requestAnimationFrame(this.draw.bind(this));
  };

  //calls move on all game objects
  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    objects.forEach (function(object) {
      object.move();
    });
  };

  //wraps game objects that move beyond game boundaries
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

  //iterates through all objects and checks collisions
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

  Game.prototype.reset = function (gameView) {
    gameView.stop();
    if (this.enemyShip) {
      this.enemyShip.destroy();
    }

    if (this.mirrorShip) {
      this.mirrorShip.destroy();
    }

    this.lives = 5;
    this.points = 0;
    this.ship.relocate();
    this.ship.vel = [0, 0];
    this.ship.angle = 0;
    this.ship.direction = [0, 1];
    this.bullets = [];
  };

  //function runs on an interval calling all necessary game functions each "step"
  Game.prototype.step = function (ctx, gameView) {
    if (this.lives <= 0) {
      this.reset(gameView);
    } else {
      if (this.asteroids.length < Asteroids.NUM_ASTEROIDS) {
        this.addAsteroid(Asteroids.Asteroid.RADIUS);
      }
      //spawn enemy ship
      if (!(this.enemyShip) &&
          this.points % 10 === 0 && 
          this.points > 0) {
            this.enemyShip = new Asteroids.EnemyShip({
                  pos: this.randomAsteroidPosition(),
                  vel: [2,2],
                  game: this,
                  player: this.ship
            });
            this.asteroids.push(this.enemyShip);
      }
      //spawn mirror ship
      if (!(this.mirrorShip) &&
          this.points % 15 === 0 && 
          this.points > 0) {
            this.mirrorShip = new Asteroids.MirrorShip({
                  pos: [-this.ship.pos[0], this.ship.pos[1]],
                  vel: this.ship.vel,
                  game: this,
                  player: this.ship
            });
            this.asteroids.push(this.mirrorShip);
      }

      if (this.mirrorShip) {
        this.mirrorShip.move();
      }

      this.moveObjects();
      this.checkCollisions();
    }
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
