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

    this.bulletImage = new Image();
    this.bulletImage.src = "images/bullet.png";
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      game.remove(otherObject);
      game.remove(this);
    }
  };

  Bullet.prototype.draw = function(ctx){
    ctx.drawImage(
      this.bulletImage,
      0,
      0,
      20,
      20,
      this.pos[0] - this.radius * 1.25,
      this.pos[1] - this.radius * 1.25,
      this.radius * 2.5,
      this.radius * 2.5
    );
  };

}());
