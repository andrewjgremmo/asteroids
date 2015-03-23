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

    this.image = new Image();
    this.image.src = "images/asteroid1.png";
    this.imageWidth = 72;
    this.imageHeight = 72;
  };
  Asteroids.Asteroid.COLOR = "#000";
  Asteroids.Asteroid.RADIUS = 25;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

})();
