(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      game.remove(otherObject);
      game.remove(this);
    }

  };

}());
