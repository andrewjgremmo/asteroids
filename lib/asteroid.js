(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(objectParams){
    Asteroids.MovingObject.call(this, {
      pos: objectParams.pos,
      vel: Asteroids.Util.randomVec(2),
      color: Asteroid.COLOR,
      radius: objectParams.radius,
      game: objectParams.game
     });

    this.image = new Image();
    this.image.src = "images/asteroid1.png";
    this.imageWidth = 72;
    this.imageHeight = 72;
  };
  Asteroids.Asteroid.COLOR = "#000";
  Asteroids.Asteroid.RADIUS = 30;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.destroy = function () {
    if (this.radius === Asteroid.RADIUS || 
        this.radius === Asteroid.RADIUS * 0.75) {
      game.addAsteroids(2, (this.radius * 0.75), this.pos); 
    }
    game.remove(this);
  };

})();
