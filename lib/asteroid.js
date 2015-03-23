(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Asteroid = Asteroids.Asteroid = function(objectParams){
    Asteroids.MovingObject.call(this, {
      pos: objectParams.pos,
      vel: Asteroids.Util.randomVec(2),
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      game: objectParams.game
     });

    this.asteroidImage = new Image();
    this.asteroidImage.src = "images/asteroid1.png";
  };
  Asteroids.Asteroid.COLOR = "#000";
  Asteroids.Asteroid.RADIUS = 25;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function(ctx){
    ctx.drawImage(
      this.asteroidImage,
      0,
      0,
      72,
      72,
      this.pos[0] - this.radius * 1.25,
      this.pos[1] - this.radius * 1.25,
      this.radius * 2.5,
      this.radius * 2.5
    );

  };

})();
