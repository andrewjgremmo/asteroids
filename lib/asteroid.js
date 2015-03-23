(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Asteroid = Asteroids.Asteroid = function(objectParams){
    Asteroids.MovingObject.call(this,
      {pos: objectParams.pos,
       vel: Asteroids.Util.randomVec(2),
       color: Asteroid.COLOR,
       radius: Asteroid.RADIUS,
       game: objectParams.game});
  };
  Asteroid.COLOR = "#000";
  Asteroid.RADIUS = 20;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  }

})();
