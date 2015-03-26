(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var EnemyShip = Asteroids.EnemyShip = function(objectParams){
    Asteroids.MovingObject.call(this, {
      pos: objectParams.pos,
      vel: Asteroids.Util.randomVec(1),
      radius: Asteroids.Ship.RADIUS,
      game: objectParams.game
     });

    this.image = new Image();
    this.image.src = "images/ship.png";
    this.imageWidth = 100;
    this.imageHeight = 100;

    var shoot = function () { 
      setTimeout(function () {
        this.fireBullet([1, 1]);
        shoot();
      }.bind(this), 5000);
    }.bind(this);
    shoot();
  };

  Asteroids.Util.inherits(EnemyShip, Asteroids.MovingObject);

  // Asteroid.prototype.collideWith = function (otherObject) {
  //   if (otherObject instanceof Asteroids.Ship) {
  //     otherObject.relocate();
  //   }
  // };

  // Asteroid.prototype.destroy = function () {
  //   if (this.radius === Asteroid.RADIUS || 
  //       this.radius === Asteroid.RADIUS * 0.75) {
  //     game.addAsteroids(2, (this.radius * 0.75), this.pos); 
  //   }
  //   game.remove(this);
  // };

  EnemyShip.prototype.fireBullet = function (vel) {
    game.bullets.push(new Asteroids.EnemyBullet({
      pos: this.pos.slice(0),
      vel: vel,
      radius: 10,
      game: this.game
    }));
  };

})();
