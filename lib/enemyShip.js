(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var EnemyShip = Asteroids.EnemyShip = function(objectParams){
    Asteroids.MovingObject.call(this, {
      pos: objectParams.pos,
      vel: Asteroids.Util.randomVec(1.75),
      radius: Asteroids.Ship.RADIUS,
      game: objectParams.game
     });

    this.image = new Image();
    this.image.src = "images/ship.png";
    this.imageWidth = 100;
    this.imageHeight = 100;

    var shoot = function () { 
      setTimeout(function () {
        if (this.game.enemyShip) {
          this.fireBullet([1, 1]);
          shoot();
        }
      }.bind(this), 3000);
    }.bind(this);
    shoot();
  };

  Asteroids.Util.inherits(EnemyShip, Asteroids.MovingObject);

  // Asteroid.prototype.destroy = function () {
  //   if (this.radius === Asteroid.RADIUS || 
  //       this.radius === Asteroid.RADIUS * 0.75) {
  //     game.addAsteroids(2, (this.radius * 0.75), this.pos); 
  //   }
  //   game.remove(this);
  // };

  EnemyShip.prototype.fireBullet = function () {
    var delx = this.pos[0] - this.game.ship.pos[0];
    var dely = this.pos[1] - this.game.ship.pos[1];
    var velx = (delx) / Math.sqrt(Math.pow(delx, 2) + Math.pow(dely, 2));
    var vely = (dely) / Math.sqrt(Math.pow(delx, 2) + Math.pow(dely, 2));
    var vel = [-5 * velx, -5 * vely]; 
    game.bullets.push(new Asteroids.EnemyBullet({
      pos: this.pos.slice(0),
      vel: vel,
      radius: 10,
      game: this.game
    }));
  };

  EnemyShip.prototype.destroy = function () {
    this.game.remove(this);
    this.game.enemyShip = undefined;
  };

})();
