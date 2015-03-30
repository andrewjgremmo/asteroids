(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var EnemyBullet = Asteroids.EnemyBullet = function(objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.image = new Image();
    this.image.src = "images/enemy_bullet.png";
    this.imageWidth = 20;
    this.imageHeight = 20;
  };

  Asteroids.Util.inherits(EnemyBullet, Asteroids.MovingObject);

  EnemyBullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.lives -= 1;
      otherObject.relocate();
    }
  };

}());
