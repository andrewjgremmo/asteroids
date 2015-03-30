(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Bullet = Asteroids.Bullet = function(objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.image = new Image();
    this.image.src = "images/bullet.png";
    this.imageWidth = 20;
    this.imageHeight = 20;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid ||
        otherObject instanceof Asteroids.EnemyShip ||
        otherObject instanceof Asteroids.MirrorShip) {
      otherObject.destroy();
      this.game.remove(this);
    }
  };

}());
