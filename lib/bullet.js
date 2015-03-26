(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Bullet = Asteroids.Bullet = function(objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.vel[0] = this.vel[0] * 2;
    this.vel[1] = this.vel[1] * 2;
    if (this.vel[0] > 2) {
      this.vel[0] = 2;
    } else if (this.vel[0] < -2) {
      this.vel[0] = -2;
    } else if (this.vel[1] > 2) {
      this.vel[1] = 2;
    } else if (this.vel[1] < -2) {
      this.vel[1] = -2;
    } else if (this.vel[0] === 0 && this.vel[1] === 0) {
      this.vel[0] = 2;
      this.vel[1] = 2;
    }

    this.image = new Image();
    this.image.src = "images/bullet.png";
    this.imageWidth = 20;
    this.imageHeight = 20;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.destroy();
      game.remove(this);
    }
  };

}());
