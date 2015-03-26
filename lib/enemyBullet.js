(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var EnemyBullet = Asteroids.EnemyBullet = function(objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.image = new Image();
    this.image.src = "images/bullet.png";
    this.imageWidth = 30;
    this.imageHeight = 30;
  };

  Asteroids.Util.inherits(EnemyBullet, Asteroids.MovingObject);

  EnemyBullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

}());
